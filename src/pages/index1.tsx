import type { NextPage } from "next";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "../store/counterSlice";
// import type { RootState } from "../store";
import { Button } from "@/components/ui/button";
import { getAnswerContent } from "@/utils/api";
import ReactMarkdown from "@/components/markdown/ReactMarkdown";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Home: NextPage = () => {
  // const count = useSelector((state: RootState) => state.counter.value);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState("");
  // const dispatch = useDispatch();

  const onMessageChunk = (chunk: string) => {
    setMessage((prevAnswer) => prevAnswer + chunk);
  };

  const handleFetchData = async () => {
    setLoading(true);
    await getAnswerContent(value, onMessageChunk);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1>输入你的问题</h1>
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
