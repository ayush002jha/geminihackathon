import { GoogleGenerativeAI } from "@google/generative-ai";
// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_SECRET || "");

export async function POST(request: Request) {
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const data = await request.formData();
  console.log(data)
  const prompt = data.get("prompt")?.toString();
  if (!prompt) {
    return Response.json({ message: "Prompt is Required!!" }, { status: 400 });
  }
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return Response.json({ message: text }, { status: 200 });
  } catch (error) {
    console.error("Error From Model API:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
