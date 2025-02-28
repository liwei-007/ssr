import ReactMarkdown from "@/components/markdown/ReactMarkdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { SseClient, SseOptions } from "@/utils/sse";

const GitHubSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 配置 SSE 请求选项
  const options: SseOptions = {
    url: "https://dashscope.aliyuncs.com/api/v1/apps/d7045172f58049279283515fa53f98bd/completion",
    method: "POST",
    params: {
      input: {
        prompt: `以 markdown 列表带样式的形式输出 github 搜索列表 { keyword: ${searchQuery} }，只包含列表部分并且链接处加粗展示`,
      },
    },
    headers: {
      Authorization: "Bearer Bearer sk-a617d9a5934742f692defb0d8d7b6782",
      "Content-Type": "application/json",
    },
    onMessage: (event) => {
      const { data } = event;
      try {
        const validData = JSON.parse(data)?.output;
        setMessage(validData?.text);
        if (validData?.finish_reason === "stop") {
          setLoading(false);
        }
        console.log("Received message:", JSON.parse(data));
      } catch {}
    },
    onError: (error) => {
      console.error("SSE error:", error);
    },
    onOpen: () => {
      console.log("SSE connection opened");
    },
    onClose: () => {
      console.log("SSE connection closed");
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // 创建 SSE 客户端实例，自动建立连接
    new SseClient(options);
  };

  return (
    <div className="flex flex-col p-10 h-screen">
      <form onSubmit={handleSubmit} className="flex space-x-4 mb-8">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="请输入关键词"
          className="w-96 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <Button
          disabled={!searchQuery || loading}
          type="submit"
          className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          {loading ? "查询中，请稍后..." : "提交"}
        </Button>
      </form>
      {/* 答案展示区域 */}
      {message && (
        <div className="bg-white p-6 rounded-md shadow-md mb-8">
          <ReactMarkdown content={message} />
        </div>
      )}
    </div>
  );
};

export default GitHubSearch;
