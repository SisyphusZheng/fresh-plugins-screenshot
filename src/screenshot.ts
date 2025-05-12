/**
 * 截图功能实现
 *
 * 使用 Astral 浏览器引擎和 ImageScript 处理图片
 * @module
 */

import { launch } from "astral";
import { Image } from "imagescript";
import type { ScreenshotPluginOptions } from "./types.ts";
import { join } from "@std/path";

/**
 * 对指定 URL 进行截图并保存
 *
 * @param url - 要截图的网页 URL
 * @param id - 截图文件的标识符
 * @param options - 截图配置选项
 * @throws {Error} 当 URL 无效或截图过程出错时抛出错误
 */
export async function takeScreenshot(
  url: string,
  id: string,
  options: ScreenshotPluginOptions = {}
) {
  const {
    outputDir = "./www/static/showcase",
    quality = 80,
    generateRetina = true,
  } = options;

  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error("Invalid URL");
  }

  const browser = await launch();
  const page = await browser.newPage(url);
  await page.waitForNetworkIdle();
  const raw = await page.screenshot();
  await browser.close();

  const cwd = Deno.cwd();
  const absoluteOutputDir = join(cwd, outputDir);
  await Deno.mkdir(absoluteOutputDir, { recursive: true });

  const image2x = await Image.decode(raw);
  await Deno.writeFile(
    join(absoluteOutputDir, `${id}2x.jpg`),
    await image2x.encodeJPEG(quality)
  );

  if (generateRetina) {
    const image1x = image2x.resize(image2x.width / 2, Image.RESIZE_AUTO);
    await Deno.writeFile(
      join(absoluteOutputDir, `${id}1x.jpg`),
      await image1x.encodeJPEG(quality)
    );
  }
}
