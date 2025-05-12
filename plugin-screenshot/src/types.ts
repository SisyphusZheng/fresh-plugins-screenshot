/**
 * Configuration options for the screenshot plugin
 * 
 * @interface ScreenshotPluginOptions
 */
export interface ScreenshotPluginOptions {
  /**
   * Output directory for screenshots
   * @default "./www/static/showcase"
   */
  outputDir?: string;

  /**
   * JPEG image quality (1-100)
   * @default 80
   */
  quality?: number;

  /**
   * Whether to generate retina version
   * @default true
   */
  generateRetina?: boolean;
}
