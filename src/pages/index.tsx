import type { NextPage } from "next";
import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "../store/counterSlice";
// import type { RootState } from "../store";
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
  // const count = useSelector((state: RootState) => state.counter.value);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [model, setModel] = useState<ModelType>("qwen-plus");
  // const dispatch = useDispatch();

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
    <div className="p-4">
      <h1 className="flex items-center mb-2">
        <span className="mr-2">知识问答</span>
        <Select
          onValueChange={(v: ModelType) => {
            setModel(v);
          }}
          defaultValue="qwen-plus"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="模型选择" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="deepseek-chat">Deepseek</SelectItem>
              <SelectItem value="qwen-plus">通义千问</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </h1>

      <div className="flex items-center">
        <Input
          onChange={(evt) => {
            setValue(evt.target?.value);
          }}
          className="w-96"
        />
        <Button
          disabled={loading || !value}
          className="m-2"
          onClick={handleFetchData}
        >
          {loading ? "生成中，请稍等。。。" : "获取答案"}
        </Button>
      </div>
      <ReactMarkdown content={message} />
      <div className="bg-white shadow-lg p-2">
        <h1 className="mt-10">游戏专区</h1>
        <nav>
          <ul className="flex flex-col md:flex-row gap-4 p-6">
            <li className="relative group">
              <Link
                href="/ai-game"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-emerald-50 rounded-lg 
                 transition-all duration-300 group-hover:scale-[1.02]
                 before:absolute before:-bottom-1 before:h-0.5 before:w-0 
                 before:bg-emerald-500 before:transition-all before:duration-300
                 hover:before:w-full hover:text-emerald-600
                 focus:outline-none focus:ring-2 focus:ring-emerald-300 before:left-0"
              >
                <span className="mr-2">🌿</span>
                丛林探险
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/game"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-amber-50 rounded-lg 
                 transition-all duration-300 group-hover:scale-[1.02]
                 before:absolute before:-bottom-1 before:h-0.5 before:w-0 
                 before:bg-amber-400 before:transition-all before:duration-300
                 hover:before:w-full hover:text-amber-600
                 focus:outline-none focus:ring-1 focus:ring-amber-300 before:left-0"
              >
                <span className="mr-2">🐍</span>
                贪吃蛇
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/gold-miner-game"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-amber-100 rounded-lg 
                 transition-all duration-300 group-hover:scale-[1.02]
                 before:absolute before:-bottom-1 before:h-0.5 before:w-0 
                 before:bg-amber-600 before:transition-all before:duration-300
                 hover:before:w-full hover:text-amber-800
                 focus:outline-none focus:ring-1 focus:ring-amber-400 before:left-0"
              >
                <span className="mr-2">⚒️</span>
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
    // const response = await getAnswerContent();
    // 发起接口请求
    // const response = await fetch("https://api.example.com/data");
    // const data = await response.json();

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
