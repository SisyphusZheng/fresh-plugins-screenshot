/**
 * Fresh Screenshot Plugin
 * 
 * This plugin provides webpage screenshot functionality for the Fresh framework. It can:
 * 1. Be integrated into the build process as a Fresh plugin
 * 2. Be used as a standalone command-line tool
 * 
 * @module
 */

import type { Builder } from "fresh/dev";
import type { App } from "fresh";
import type { ScreenshotPluginOptions } from "./types.ts";
import { takeScreenshot } from "./screenshot.ts";

/**
 * Initialize the Fresh screenshot plugin
 * 
 * @param builder - Fresh builder instance
 * @param app - Fresh application instance
 * @param options - Plugin configuration options
 * @returns void
 */
export function screenshot<T>(
  _builder: Builder,
  _app: App<T>,
  _options: ScreenshotPluginOptions = {},
) {
  // Plugin initialization, no special handling needed for now
}

// Command line entry point
if (import.meta.main) {
  const args = Deno.args;
  if (args.length !== 3 || args[0] !== "screenshot") {
    throw new Error("Usage: deno run -A mod.ts screenshot <url> <id>");
  }

  const [_, url, id] = args;
  try {
    await takeScreenshot(url, id, {
      outputDir: "./www/static/showcase",
      quality: 80,
      generateRetina: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
}
