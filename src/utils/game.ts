import { GameScene } from "@/types/game";
import OpenAI from "openai";

const openai = new OpenAI({
  //   apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-b741625a0a084b3195803bff0cb66327",
  dangerouslyAllowBrowser: true,
});

export const generateScene = async (context: string): Promise<GameScene> => {
  const prompt = `
  作为 RPG 游戏 AI 主持人，根据当前情境生成 3 个选项：
  当前情境: ${context}
  返回 JSON 格式:
  {
    "description": "场景描述",
    "options": [
      {"id": 1, "text": "选项1"},
      {"id": 2, "text": "选项2"},
      {"id": 3, "text": "选项3"}
    ]
  }`;

  const response = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    response_format: {
      type: "json_object",
    },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
};
