// const OSS = require("ali-oss");
import OSS from "ali-oss";

// 从环境变量中获取 OSS 配置信息
const accessKeyId = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID ?? "";
const accessKeySecret = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET ?? "";
const endpoint = process.env.OSS_ENDPOINT;
const bucket = process.env.OSS_BUCKET;

// 创建 OSS 客户端实例
const client = new OSS({
  accessKeyId,
  accessKeySecret,
  endpoint,
  bucket,
});

// 上传文件到 OSS 的函数
async function uploadFileToOSS(objectKey: any, localFilePath: any) {
  try {
    const result = await client.put(objectKey, localFilePath);
    console.log("文件上传成功:", result);
    return result;
  } catch (error) {
    console.error("文件上传失败:", error);
    throw error;
  }
}

// 获取 OSS 桶列表的函数
async function getOSSBucketList() {
  try {
    const result = await client.listBuckets({});
    console.log("获取桶列表成功:", result);
    return result;
  } catch (error) {
    console.error("获取桶列表失败:", error);
    throw error;
  }
}

export { uploadFileToOSS, getOSSBucketList };
