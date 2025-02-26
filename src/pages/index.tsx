import type { NextPage } from "next";
// import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "../store/counterSlice";
import type { RootState } from "../store";
import { Button } from "@/components/ui/button";
import { getAnswerContent } from "@/utils/api";
import ReactMarkdown from "@/components/markdown/ReactMarkdown";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Home: NextPage = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState("");
  // const dispatch = useDispatch();

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
        {/* <p className="font-bold">Count: {count}</p> */}
        {/* <Button
        className="bg-red-500 hover:bg-red-600 text-white"
        onClick={() => dispatch(increment())}
      >
        同意
      </Button>
      <Button className="m-2" onClick={() => dispatch(decrement())}>
        不同意
      </Button> */}
        <Button
          disabled={loading || !value}
          className="m-2"
          onClick={async () => {
            setLoading(true);
            const response = await getAnswerContent({ input: value });
            setMessage(response?.message);
            setLoading(false);
            console.log(1111, response);
          }}
        >
          {loading ? "获取中，请稍等。。。" : "获取答案"}
        </Button>
      </div>

      {/* <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav> */}
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
