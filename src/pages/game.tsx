import React, { useState, useEffect, useRef } from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  });
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "ArrowUp" && direction !== "down") setDirection("up");
      if (e.key === "ArrowDown" && direction !== "up") setDirection("down");
      if (e.key === "ArrowLeft" && direction !== "right") setDirection("left");
      if (e.key === "ArrowRight" && direction !== "left") setDirection("right");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    const moveSnake = () => {
      if (gameOver) return;

      let newHead: { x: any; y: any } = {
        x: null,
        y: null,
      };
      const head = snake[0];

      switch (direction) {
        case "up":
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case "down":
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case "left":
          newHead = { x: head.x - 1, y: head.y };
          break;
        case "right":
          newHead = { x: head.x + 1, y: head.y };
          break;
        default:
          break;
      }

      // 检查是否吃到食物
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
      } else {
        // 移除蛇尾
        snake.pop();
      }

      // 检查是否撞到墙壁或自己
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        snake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        return;
      }

      // 添加新的蛇头
      setSnake([newHead, ...snake]);
    };

    intervalRef.current = setInterval(moveSnake, 200);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [snake, direction, food, gameOver]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    });
    setDirection("right");
    setGameOver(false);
  };

  return (
    <div className="relative">
      <div
        className="grid grid-cols-[repeat(20,20px)] grid-rows-[repeat(20,20px)] gap-0 border border-gray-300"
        style={{
          width: `${GRID_SIZE * CELL_SIZE}px`,
          height: `${GRID_SIZE * CELL_SIZE}px`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);

          const isSnakeSegment = snake.some(
            (segment) => segment.x === x && segment.y === y
          );
          const isSnakeHead = snake[0].x === x && snake[0].y === y;

          if (isSnakeSegment) {
            return (
              <div
                key={index}
                className={`${
                  isSnakeHead ? "bg-green-600" : "bg-green-400"
                } rounded-md shadow-md`}
                style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
              />
            );
          }

          if (food.x === x && food.y === y) {
            return (
              <div
                key={index}
                className="bg-red-500 rounded-full shadow-md"
                style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
              />
            );
          }

          return (
            <div
              key={index}
              style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
            />
          );
        })}
      </div>
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md text-center">
          <p className="text-red-500 font-bold">Game Over!</p>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
