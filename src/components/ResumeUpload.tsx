"use client";

import { useState, useRef } from "react";
import AnalysisResult from "./AnalysisResult";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidFile = (f: File) => {
    const name = f.name.toLowerCase();
    return name.endsWith(".pdf") || name.endsWith(".docx") || name.endsWith(".txt");
  };

  function handleFile(f: File) {
    if (!isValidFile(f)) {
      setError("仅支持 PDF、DOCX、TXT 格式");
      return;
    }
    setError("");
    setFile(f);
    setResult(null);
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "分析失败");
      } else {
        setResult(data.result);
      }
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setFile(null);
    setResult(null);
    setError("");
  }

  // ===== Show result =====
  if (result) {
    return <AnalysisResult result={result} onReset={handleReset} />;
  }

  return (
    <div>
      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <div className="text-5xl mb-4">
          {file ? "📄" : "📁"}
        </div>
        {file ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {file.name}
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              上传你的简历
            </h3>
            <p className="text-gray-500 mb-1">
              拖拽文件到此处，或点击选择文件
            </p>
            <p className="text-xs text-gray-400">
              支持 PDF、DOCX、TXT 格式
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
      )}

      {/* Action buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {file && (
          <>
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AI 分析中...
                </>
              ) : (
                "🚀 开始 AI 分析"
              )}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className="text-gray-500 px-6 py-3 rounded-full font-medium border border-gray-200 hover:border-gray-300 transition-colors disabled:opacity-50"
            >
              重新选择
            </button>
          </>
        )}
      </div>
    </div>
  );
}
