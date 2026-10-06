import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const categories = ['개발일지', '작업 기록', '릴리스 노트'] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(categories),
    summary: z.string(),
    // src/assets/images 안의 파일 이름 (예: post-office.jpg)
    cover: z.string().optional(),
  }),
});

export const collections = { blog };
