import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const categories = ['개발일지', '작업 기록', '릴리스 노트'] as const;

/** 개발일지 글은 모두 이 커버를 쓴다. cover를 비워 두면 자동으로 이 그림이 들어간다. */
export const DEVLOG_COVER = 'devlog-cover.webp';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(categories),
      summary: z.string(),
      // src/assets/images 안의 파일 이름 (예: writing-good-prompts-cover.webp)
      cover: z.string().optional(),
    })
    .refine((post) => post.category !== '개발일지' || post.cover === undefined || post.cover === DEVLOG_COVER, {
      message: `개발일지 글의 cover는 ${DEVLOG_COVER}만 쓸 수 있어요. 비워 두면 자동으로 들어가요.`,
      path: ['cover'],
    })
    .transform((post) => (post.category === '개발일지' ? { ...post, cover: DEVLOG_COVER } : post)),
});

export const collections = { blog };
