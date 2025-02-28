import OpenAI from "openai";

const openai = new OpenAI({
  // baseURL: "https://api.deepseek.com",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

async function getAnswerContent(
  input: string,
  onMessageChunk: (chunk: string) => void
) {
  const stream = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
    // model: "deepseek-chat",
    model: "qwen-plus",
    max_tokens: 100,
    stream: true,
  });

  for await (const part of stream) {
    const content = part.choices[0]?.delta?.content;
    if (content) {
      onMessageChunk(content);
    }
  }
}

export { getAnswerContent };
