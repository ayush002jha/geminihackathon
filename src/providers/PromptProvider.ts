export type PromptType = { type: string; prompt: string };

export const Prompts = [
  {
    type: "MCQ",
    prompt: `Given the following context, generate a JSON response with a multiple-choice question (MCQ). Generate 5 MCQs JSON Array Related To Question And Context. The JSON should include the question, four options labeled A, B, C, and D, and the correct answer. Ensure the answer key matches the correct option.

Give Only JSON Array in Output and Nothing else! The JSON Array should be in stringified format without '''json ''' backticks
Output Format:
{
    "question": "What is the capital of France?",
    "options": ["A. London", "B. Paris", "C. Berlin", "D. Madrid"],
    "answer": "B"
}`,
  },
  {
    type: "Explain",
    prompt: `Explain the following topic thoroughly, providing detailed explanations and definitions for complex terminologies. The output should be formatted in MarkDown and should be as comprehensive as possible.


Output Format: 
- Use Markdown for formatting.
- Provide definitions for technical terms.
- Include examples where necessary.`,
  },
  {
    type: "Summarize",
    prompt: `Summarize the following content into a short paragraph around 200 words. Ensure the summary is concise yet captures the essence of the content. The output should be formatted in MarkDown.


Output Format: 
- One or two paragraphs.
- Limit to around 200 words.
- Use Markdown for formatting.`,
  },
  {
    type: "Bullet Points",
    prompt: `Provide a concise summary of the following topic in short bullet points. Each point should capture key information. The output should be formatted in MarkDown with appropriate headings.


Output Format:
- Use bullet points.
- Keep each point brief.
- Use Markdown for formatting with headings.`,
  },
  {
    type: "Table Comparison",
    prompt: `Compare the following two items in a tabular format. The comparison should include key attributes and differences. The output should be strictly in a table format.

    
    Output Format:

    Items: {{item1}} vs. {{item2}}

| Attribute | {{item1}} | {{item2}} |
|-----------|-----------|-----------|
|           |           |           |`,
  },
];
