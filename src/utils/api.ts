import OpenAI from "openai";

// 类型定义
type ModelType = "deepseek-chat" | "qwen-plus";
type ModelConfig = {
  baseURL: string;
  apiKey: string;
};
// 模型配置映射
const MODEL_CONFIGS: Record<ModelType, ModelConfig> = {
  "deepseek-chat": {
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_KEY!,
  },
  "qwen-plus": {
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiKey: process.env.NEXT_PUBLIC_QWEN_KEY!,
  },
};

// 实例缓存对象
const openAIClients: Record<ModelType, OpenAI | null> = {
  "deepseek-chat": null,
  "qwen-plus": null,
};

// 获取或创建客户端实例
function getOpenAIClient(model: ModelType): OpenAI {
  if (!openAIClients[model]) {
    openAIClients[model] = new OpenAI({
      baseURL: MODEL_CONFIGS[model].baseURL,
      apiKey: MODEL_CONFIGS[model].apiKey,
      dangerouslyAllowBrowser: true,
    });
  }
  return openAIClients[model]!;
}

async function getAnswerContent(
  input: string,
  model: ModelType,
  onMessageChunk: (chunk: string) => void
) {
  const openai = getOpenAIClient(model);

  const stream = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
    model: model, // 直接使用传入的 model 参数
    // max_tokens: 100,
    stream: true,
  });

  for await (const part of stream) {
    const content = part.choices[0]?.delta?.content;
    if (content) {
      onMessageChunk(content);
    }
  }
}

export { getAnswerContent, type ModelType };
