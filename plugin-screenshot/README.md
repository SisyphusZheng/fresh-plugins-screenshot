# Fresh Screenshot Plugin

一个用于 Fresh 框架的网页截图插件，支持生成多种分辨率的截图。

## 功能特点

- 支持作为 Fresh 插件集成
- 支持作为独立的命令行工具使用
- 自动生成视网膜屏幕版本
- 可配置输出质量和目录

## 安装

```bash
deno add @freshpress/plugin-screenshot
```

## 使用方法

### 作为 Fresh 插件

在 `dev.ts` 中配置：

```ts
import { screenshot } from "@freshpress/plugin-screenshot";

const builder = new Builder();
screenshot(builder, app, {
  outputDir: "./static/showcase",
  quality: 80,
  generateRetina: true,
});
```

### 作为命令行工具

```bash
# 基本用法
deno task screenshot screenshot https://example.com example

# 自定义输出目录
deno task screenshot screenshot https://example.com example --output-dir=./custom/dir

# 自定义图片质量
deno task screenshot screenshot https://example.com example --quality=90
```

## 配置选项

```ts
interface ScreenshotPluginOptions {
  // 截图输出目录
  outputDir?: string;
  
  // JPEG 图片质量 (1-100)
  quality?: number;
  
  // 是否生成视网膜屏幕版本
  generateRetina?: boolean;
}
```

## 输出文件

插件会在指定目录生成以下文件：

- `{id}1x.jpg` - 标准分辨率版本
- `{id}2x.jpg` - 视网膜屏幕版本

## 注意事项

- 确保目标 URL 可以公开访问
- 建议使用 HTTPS URL
- 输出目录会自动创建
- 默认输出到 `./www/static/showcase` 目录

## 许可证

MIT
