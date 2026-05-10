"use client";

import { useRef } from "react";

export default function AnalysisResult({
  result,
  onReset,
}: {
  result: string;
  onReset: () => void;
}) {
  const resultRef = useRef<HTMLDivElement>(null);

  function handleCopy() {
    if (resultRef.current) {
      // Get just the optimized resume section
      const text = resultRef.current.innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert("已复制到剪贴板！");
      });
    }
  }

  // Render markdown-like content as HTML
  function renderContent(text: string): string {
    let html = text
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-100">$1</h2>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Lists
      .replace(/^- (.*$)/gm, '<li class="text-gray-700 ml-4 list-disc">$1</li>')
      .replace(/^\d\. (.*$)/gm, '<li class="text-gray-700 ml-4 list-decimal">$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-3">')
      .replace(/\n/g, "<br />");

    html = '<p class="text-gray-700 leading-relaxed mb-3">' + html + "</p>";
    // Wrap consecutive list items
    html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-1 my-3">$&</ul>');
    // Clean up empty paragraphs
    html = html.replace(/<p class="[^"]*"><br \/><\/p>/g, "");

    return html;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm font-medium text-gray-700">AI 优化完成</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            📋 复制
          </button>
          <button
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ← 分析新简历
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-none" ref={resultRef}>
        <div
          dangerouslySetInnerHTML={{ __html: renderContent(result) }}
          className="prose prose-gray max-w-none"
        />
      </div>

      {/* Bottom CTA */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          满意这个结果吗？升级高级版可以获得更多优化次数和模板
        </p>
        <a
          href="/#pricing"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          升级高级版
        </a>
      </div>
    </div>
  );
}
