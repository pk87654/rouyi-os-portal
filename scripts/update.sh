#!/usr/bin/env bash
# ==============================================================================
# update.sh - 睿易门户网站生产环境一键零停机热更新脚本
# ==============================================================================

set -e

echo "🚀 [1/4] 正在从 Git 仓库拉取最新文档与代码..."
git pull origin main

echo "📦 [2/4] 正在安装依赖 (如需)..."
pnpm install --frozen-lockfile

echo "🔨 [3/4] 正在执行生产环境编译打包..."
pnpm build

echo "🔄 [4/4] 正在执行 PM2 平滑零停机热重载 (Zero-Downtime Reload)..."
if pm2 list | grep -q "ruiyi-portal"; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi

echo "✨ ========================================================"
echo "🎉 睿易门户网站已成功完成零停机热更新上线！"
echo "🌐 访问端口: 3000 (或 Nginx 代理域名)"
echo "✨ ========================================================"
