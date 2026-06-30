import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";
import type { MarkdownRenderer } from "@astrojs/internal-helpers/markdown";

let renderer: MarkdownRenderer | undefined;

async function getRenderer() {
  renderer ??= await createSatteriMarkdownProcessor();
  return renderer;
}

export async function renderMarkdown(content: string): Promise<string> {
  const { code } = await (await getRenderer()).render(content, {
    frontmatter: {},
  });
  return code;
}
