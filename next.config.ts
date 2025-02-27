import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "", // 去掉基础路径
  // assetPrefix:
  //   process.env.NODE_ENV === "production"
  //     ? "https://read-ssr.oss-cn-hangzhou.aliyuncs.com"
  //     : "",
  env: {
    NEXT_PUBLIC_OPENAI_KEY: "sk-b741625a0a084b3195803bff0cb66327",
  },
};

export default nextConfig;
