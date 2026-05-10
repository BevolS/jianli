import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// ===== File Parsing =====

async function parsePDF(buffer: Buffer): Promise<string> {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
}

async function parseDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function parseFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    return await parsePDF(buffer);
  }
  if (name.endsWith(".docx")) {
    return await parseDOCX(buffer);
  }
  if (name.endsWith(".txt")) {
    return buffer.toString("utf-8");
  }
  throw new Error("不支持的文件格式，请上传 PDF、DOCX 或 TXT 文件");
}

// ===== DeepSeek API =====

const SYSTEM_PROMPT = `你是一位专业的简历优化专家。你的任务是分析用户提供的简历内容，并给出优化建议。

请按以下格式输出优化结果：

## 📋 总体评价
对简历的整体评价，2-3句话。

## 🔍 存在的问题
列出简历中的具体问题，每条一行：
- 问题描述

## ✨ 优化建议
逐条给出具体的修改建议：
1. 具体建议

## 📝 优化后的简历
给出完整的优化版本。保留原有信息，但优化表达方式、使用更专业的词汇、突出量化成果。`;

async function callDeepSeek(resumeText: string): Promise<string> {
  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `这是我的简历内容，请帮我分析和优化：\n\n${resumeText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("DeepSeek API 错误:", err);
    throw new Error("AI 分析失败，请稍后重试");
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// ===== Route Handler =====

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "请上传简历文件" }, { status: 400 });
    }

    // Parse file
    let text: string;
    try {
      text = await parseFile(file);
    } catch {
      return NextResponse.json(
        { error: "无法解析文件，请确保文件格式正确" },
        { status: 400 }
      );
    }

    if (text.trim().length < 50) {
      return NextResponse.json(
        { error: "简历内容太短，请上传完整的简历" },
        { status: 400 }
      );
    }

    // Call AI
    const result = await callDeepSeek(text);

    return NextResponse.json({ result, fileName: file.name });
  } catch (error) {
    console.error("分析失败:", error);
    return NextResponse.json(
      { error: "分析失败，请稍后重试" },
      { status: 500 }
    );
  }
}
