import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		ogImage: z.string().optional(),
		noindex: z.boolean().default(false),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
		task: z.string().optional(),
		solution: z.string().optional(),
		techStack: z.array(z.string()).default([]),
	}),
});

export const collections = { pages };
