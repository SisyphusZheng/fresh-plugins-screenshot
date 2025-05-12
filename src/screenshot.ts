/**
 * Screenshot functionality implementation
 *
 * Uses Astral browser engine and ImageScript for image processing
 * @module
 */

import { launch } from "astral";
import { Image } from "imagescript";
import type { ScreenshotPluginOptions } from "./types.ts";
import { join } from "@std/path";

/**
 * Takes a screenshot of the specified URL and saves it
 *
 * @param url - The webpage URL to screenshot
 * @param id - Identifier for the screenshot file
 * @param options - Screenshot configuration options
 * @throws {Error} Throws an error when URL is invalid or screenshot process fails
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
