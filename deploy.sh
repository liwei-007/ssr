#!/bin/bash

# 项目根目录
PROJECT_DIR=$(pwd)

# 阿里云服务器信息
REMOTE_USER="aliyun5592000598"
REMOTE_HOST="114.55.89.159"
REMOTE_PORT="80"
REMOTE_PATH="/var/www/html/NEXTJS-SSR-DEMO"

# 定义错误处理函数
handle_error() {
    echo "Error occurred on line $1. Deployment failed."
    exit 1
}

# 设置错误陷阱
trap 'handle_error $LINENO' ERR

# 步骤 1: 安装依赖
echo "Step 1: Installing dependencies..."
npm install

# 步骤 2: 构建项目
echo "Step 2: Building the project..."
npm run build

# 步骤 3: 备份旧文件（可选）
echo "Step 3: Backing up old files..."
ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_PATH/backup && mv $REMOTE_PATH/* $REMOTE_PATH/backup/"

# 步骤 4: 上传新文件
echo "Step 4: Uploading new files..."
scp -P $REMOTE_PORT -r $PROJECT_DIR/dist/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

# 步骤 5: 清理本地构建文件（可选）
echo "Step 5: Cleaning up local build files..."
rm -rf $PROJECT_DIR/dist

echo "Deployment completed successfully!"