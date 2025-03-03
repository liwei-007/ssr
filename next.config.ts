import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "", // 去掉基础路径
  // assetPrefix:
  //   process.env.NODE_ENV === "production"
  //     ? "https://read-ssr.oss-cn-hangzhou.aliyuncs.com"
  //     : "",
  env: {
    NEXT_PUBLIC_DEEPSEEK_KEY: "sk-b741625a0a084b3195803bff0cb66327", // deepseek
    NEXT_PUBLIC_QWEN_KEY: "sk-a617d9a5934742f692defb0d8d7b6782", // 通义千问
  },
  images: {
    domains: ["dashscope-result-wlcb.oss-cn-wulanchabu.aliyuncs.com"],
  },
};

export default nextConfig;
