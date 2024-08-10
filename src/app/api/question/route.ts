import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPineconeStore } from "@/lib/pineconeClient";
import { Prompts } from "@/providers/PromptProvider";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_SECRET!);

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const question = data.get("prompt")?.toString();
  // Fix: Call toString() method instead of accessing it
  const selectedPrompt = data.get('selectedPrompt')?.toString();

  if (!question || !selectedPrompt) {
    return Response.json({ message: "Prompt and selectedPrompt are required!" }, { status: 400 });
  }

  const selectedPromptObject = Prompts.find(p => p.type === selectedPrompt);

  if (!selectedPromptObject) {
    return Response.json({ message: "Invalid selectedPrompt!" }, { status: 400 });
  }

  // Get Pinecone store
  const vectorStore = await getPineconeStore();

  // Perform similarity search
  const relevantDocs = await vectorStore.similaritySearch(question, 3);

  // Concatenate the relevant documents into a context
  const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Combine the selected prompt with the context and question
  const fullPrompt = `
  You are an Helpful Assistant. Always stick to the point and answer in short. Be Polite and Greet Everytime
  
  ${selectedPromptObject.prompt}

Context: ${context}

User Query: ${question}

Answer:`;

// console.log(fullPrompt)

  try {
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();
    return Response.json({ message: text }, { status: 200 });
  } catch (error) {
    console.error("Error From Model API:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}