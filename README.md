# Fresh Screenshot Plugin

A webpage screenshot plugin for the Fresh framework that supports generating screenshots in multiple resolutions.

## Features

- Supports integration as a Fresh plugin
- Can be used as a standalone command-line tool
- Automatically generates retina screen versions
- Configurable output quality and directory

## Installation

```bash
deno add @freshpress/plugin-screenshot
```

## Usage

### As a Fresh Plugin

Configure in `dev.ts`:

```ts
import { screenshot } from "@freshpress/plugin-screenshot";

const builder = new Builder();
screenshot(builder, app, {
  outputDir: "./static/showcase",
  quality: 80,
  generateRetina: true,
});
```

### As a Command Line Tool

```bash
# Basic usage
deno task screenshot screenshot https://example.com example

# Custom output directory
deno task screenshot screenshot https://example.com example --output-dir=./custom/dir

# Custom image quality
deno task screenshot screenshot https://example.com example --quality=90
```

## Configuration Options

```ts
interface ScreenshotPluginOptions {
  // Screenshot output directory
  outputDir?: string;
  
  // JPEG image quality (1-100)
  quality?: number;
  
  // Whether to generate retina screen version
  generateRetina?: boolean;
}
```

## Output Files

The plugin will generate the following files in the specified directory:

- `{id}1x.jpg` - Standard resolution version
- `{id}2x.jpg` - Retina screen version

## Notes

- Ensure the target URL is publicly accessible
- HTTPS URLs are recommended
- Output directory will be created automatically
- Default output to `./www/static/showcase` directory

## License

MIT
