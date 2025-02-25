import type { NextPage } from "next";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/counterSlice";
import type { RootState } from "../store";
import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>hello，曹骏 and 文涛</h1>
      <p className="font-bold">Count: {count}</p>
      <Button
        className="bg-red-500 hover:bg-red-600 text-white"
        onClick={() => dispatch(increment())}
      >
        Increment
      </Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
