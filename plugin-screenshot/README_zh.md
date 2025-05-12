# Fresh Screenshot Plugin

这是一个用于 Fresh 框架的截图工具，可以方便地为网页生成截图。

## 安装

在你的 Fresh 项目中，将插件添加到 `dev.ts` 文件中：

```ts
import { screenshot } from "../plugin-screenshot/src/mod.ts";

// ... 其他导入

const builder = new Builder({ target: "safari12" });
screenshot(builder, app, {
  outputDir: "./static/showcase", // 可选，默认为 "./www/static/showcase"
  quality: 80, // 可选，默认为 80
  generateRetina: true, // 可选，默认为 true
});
```

## 使用方法

插件提供了两种使用方式：

### 1. 作为 Fresh 插件

在 `dev.ts` 中引入插件后，它会作为 Fresh 构建过程的一部分。

### 2. 作为命令行工具

你可以直接使用命令行工具来生成截图：

```bash
deno task screenshot screenshot <url> <id>
```

例如：

```bash
deno task screenshot screenshot https://deno.land deno-land
```

这将会：

1. 访问 https://deno.land
2. 生成截图
3. 保存为 `./www/static/showcase/deno-land2x.jpg` 和
   `./www/static/showcase/deno-land1x.jpg`（如果 generateRetina 为 true）

## 配置选项

插件支持以下配置选项：

- `outputDir`: 截图保存的目录（默认："./www/static/showcase"）
- `quality`: JPEG 质量，范围 1-100（默认：80）
- `generateRetina`: 是否生成 1x 和 2x 两种尺寸（默认：true）

## 注意事项

- 确保目标 URL 是有效的 HTTP/HTTPS 地址
- 截图会自动等待页面加载完成
- 默认会生成高清（2x）和普通（1x）两种尺寸的图片
- 所有截图都会保存在 `www/static/showcase` 目录下
