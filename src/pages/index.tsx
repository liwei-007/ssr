import type { NextPage } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAnswerContent, type ModelType } from "@/utils/api";
import ReactMarkdown from "@/components/markdown/ReactMarkdown";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Home: NextPage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [model, setModel] = useState<ModelType>("qwen-plus");

  const onMessageChunk = (chunk: string) => {
    setMessage((prevAnswer) => prevAnswer + chunk);
  };

  const handleFetchData = async () => {
    setLoading(true);
    setMessage("");
    await getAnswerContent(value, model, onMessageChunk);
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* 标题和模型选择区域 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">知识问答</h2>
        <div className="w-48">
          <Select
            onValueChange={(v: ModelType) => {
              setModel(v);
            }}
            defaultValue="qwen-plus"
          >
            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
              <SelectValue placeholder="模型选择" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded-md shadow-lg">
              <SelectGroup>
                <SelectItem value="deepseek-chat">Deepseek</SelectItem>
                <SelectItem value="qwen-plus">通义千问</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 输入框和按钮区域 */}
      <div className="flex items-center space-x-4 mb-8">
        <Input
          onChange={(evt) => {
            setValue(evt.target?.value);
          }}
          className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="请输入问题"
        />
        <Button
          disabled={loading || !value}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          } text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300`}
          onClick={handleFetchData}
        >
          {loading ? "生成中，请稍等。。。" : "获取答案"}
        </Button>
      </div>

      {/* 答案展示区域 */}
      {message && (
        <div className="bg-white p-6 rounded-md shadow-md mb-8">
          <ReactMarkdown content={message} />
        </div>
      )}
      {/* 工具专区 */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">工具专区</h2>
        <nav>
          <ul className="flex flex-col md:flex-row gap-4">
            <li className="flex-1">
              <Link
                href="/qcode"
                className="block bg-white border border-gray-300 rounded-md py-4 px-6 text-center text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <span className="block text-2xl mb-2">📖</span>
                二维码生成
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/delivery"
                className="block bg-white border border-gray-300 rounded-md py-4 px-6 text-center text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <span className="block text-2xl mb-2">📦</span>
                快递查询
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* 游戏专区 */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏专区</h2>
        <nav>
          <ul className="flex flex-col md:flex-row gap-4">
            <li className="flex-1">
              <Link
                href="/ai-game"
                className="block bg-white border border-gray-300 rounded-md py-4 px-6 text-center text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <span className="block text-2xl mb-2">🌿</span>
                丛林探险
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/game"
                className="block bg-white border border-gray-300 rounded-md py-4 px-6 text-center text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <span className="block text-2xl mb-2">🐍</span>
                贪吃蛇
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/gold-miner-game"
                className="block bg-white border border-gray-300 rounded-md py-4 px-6 text-center text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span className="block text-2xl mb-2">⚒️</span>
                黄金矿工
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    return {
      props: {
        data: {},
      },
    };
  } catch (error) {
    console.error("接口请求出错:", error);
    return {
      props: {
        data: null,
      },
    };
  }
}

export default Home;
