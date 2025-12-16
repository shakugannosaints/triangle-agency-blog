# 部署指南 - Triangle Agency Blog

本文档提供了将 Triangle Agency Blog 部署到 GitHub Pages 的详细步骤。

## 前置要求

- GitHub 账户
- Git 已安装
- Node.js 20+ 或 22+
- pnpm 10+

## 快速开始

### 1. 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

### 2. 部署到 GitHub Pages

#### 方案 A：自动部署（推荐）

如果您有权限管理 GitHub Actions workflow：

1. 确保 `.github/workflows/deploy.yml` 文件存在
2. 在 GitHub 仓库设置中启用 GitHub Actions
3. 每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署

#### 方案 B：手动部署（简单）

1. **本地构建**
   ```bash
   pnpm build
   ```

2. **推送到 GitHub Pages 分支**
   ```bash
   # 方法 1：使用 gh-pages 包
   npm install --save-dev gh-pages
   npx gh-pages -d dist/public
   
   # 方法 2：手动推送
   git subtree push --prefix dist/public origin gh-pages
   ```

3. **配置 GitHub Pages**
   - 访问 https://github.com/YOUR_USERNAME/triangle-agency-blog/settings/pages
   - 在 "Source" 下选择 "Deploy from a branch"
   - 选择 `gh-pages` 分支
   - 点击 "Save"

#### 方案 C：使用 GitHub Pages 设置（最简单）

1. **本地构建**
   ```bash
   pnpm build
   ```

2. **提交并推送**
   ```bash
   git add dist/
   git commit -m "Build for deployment"
   git push origin main
   ```

3. **配置 GitHub Pages**
   - 访问 https://github.com/YOUR_USERNAME/triangle-agency-blog/settings/pages
   - 在 "Source" 下选择 "Deploy from a branch"
   - 选择 `main` 分支和 `/root` 目录（如果使用 dist 目录）
   - 点击 "Save"

## 自定义域名

如果您想使用自定义域名（例如 `blog.example.com`）：

1. **在仓库根目录创建 CNAME 文件**
   ```
   your-domain.com
   ```

2. **更新 DNS 设置**
   - 添加 CNAME 记录指向 `YOUR_USERNAME.github.io`
   - 或添加 A 记录指向 GitHub Pages IP 地址

3. **在 GitHub 设置中配置**
   - 访问 Settings > Pages
   - 在 "Custom domain" 输入您的域名
   - 启用 "Enforce HTTPS"

## 常见问题

### Q: 如何更新已部署的网站？

A: 只需推送新的更改到 `main` 分支。如果使用自动部署，GitHub Actions 会自动重新构建和部署。如果使用手动部署，运行 `pnpm build` 并推送 `dist/` 目录。

### Q: 部署后看不到更新？

A: 
1. 清除浏览器缓存（Ctrl+Shift+Delete）
2. 等待几分钟让 GitHub Pages 完成部署
3. 检查 GitHub Actions 日志确保构建成功

### Q: 如何使用自己的域名？

A: 参考上面的"自定义域名"部分。

### Q: 如何回滚到之前的版本？

A: 使用 `git revert` 或 `git reset` 恢复到之前的提交，然后推送。

## 环境变量

如果需要使用环境变量（例如 API 密钥），可以在 `.env` 文件中定义：

```
VITE_API_URL=https://api.example.com
VITE_PUBLIC_KEY=your_public_key
```

注意：以 `VITE_` 前缀的变量会在构建时被注入到客户端代码中。

## 性能优化

### 1. 图片优化

确保在 `/public/articles/` 中使用优化过的图片：
- 使用 WebP 格式（如果浏览器支持）
- 压缩图片大小
- 使用合适的分辨率

### 2. 代码分割

Vite 会自动进行代码分割，但您可以在 `vite.config.ts` 中调整：

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor': ['react', 'react-dom'],
      }
    }
  }
}
```

### 3. 缓存策略

GitHub Pages 会自动缓存静态资源。确保使用内容哈希的文件名以便缓存破坏。

## 监控和分析

### 添加分析

如果想跟踪访问者，可以集成分析服务：

1. **Google Analytics**
   - 在 `client/index.html` 中添加 GA 脚本
   - 或使用 React 组件集成

2. **Plausible Analytics**
   - 轻量级、隐私友好的分析
   - 在 `client/index.html` 中添加脚本

## 故障排除

### 构建失败

```bash
# 清除缓存
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 检查 TypeScript 错误
pnpm check

# 重新构建
pnpm build
```

### 部署失败

1. 检查 GitHub Actions 日志
2. 确保有足够的权限
3. 检查分支名称是否正确
4. 验证 `dist/public` 目录存在

## 进阶配置

### 自定义构建输出

编辑 `vite.config.ts`：

```typescript
export default defineConfig({
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
    rollupOptions: {
      // 自定义 Rollup 选项
    }
  }
})
```

### 环境特定配置

创建 `.env.production` 文件用于生产环境特定的变量。

---

**需要帮助？** 查看 [README.md](./README.md) 或在 GitHub Issues 中提问。
