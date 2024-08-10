import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPineconeStore } from "@/lib/pineconeClient";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_SECRET!);

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const question = data.get("prompt")?.toString();
  if (!question) {
    return Response.json({ message: "Prompt is Required!!" }, { status: 400 });
  }

  // Get Pinecone store
  const vectorStore = await getPineconeStore();

  // Perform similarity search
  const relevantDocs = await vectorStore.similaritySearch(question, 3);

  // Concatenate the relevant documents into a context
  const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Context: ${context}\n\nQuestion: ${question}\n\nAnswer:`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return Response.json({ message: text }, { status: 200 });
  } catch (error) {
    console.error("Error From Model API:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }

//   return NextResponse.json({ answer });
}
