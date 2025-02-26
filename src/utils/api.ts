import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-b741625a0a084b3195803bff0cb66327",
  dangerouslyAllowBrowser: true,
});

async function getAnswerContent({ input }: { input: string }) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
    model: "deepseek-chat",
    max_tokens: 100,
  });

  return {
    message: completion.choices[0].message.content,
  };
}

export { getAnswerContent };
