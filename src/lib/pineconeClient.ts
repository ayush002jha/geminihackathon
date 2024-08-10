import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";

let client: Pinecone | null = null;

export async function getPineconeClient() {
  if (!client) {
    client = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return client;
}

export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_SECRET!,
  modelName: "embedding-001",
});

export async function getPineconeStore() {
  const client = await getPineconeClient();
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX!);

  return new PineconeStore(embeddings, { pineconeIndex });
}