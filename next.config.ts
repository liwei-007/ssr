import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "", // 去掉基础路径
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://read-ssr.oss-cn-hangzhou.aliyuncs.com"
      : "",
};

export default nextConfig;
