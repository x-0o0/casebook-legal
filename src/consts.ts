import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

// App Store 주소가 생기면 넣는다. 비어 있으면 다운로드 버튼을 숨긴다.
export const APP_STORE_URL = '';

/** base(/casebook-legal/)를 붙인 사이트 안 주소 */
export function url(path = '') {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}

export function postUrl(post: CollectionEntry<'blog'>) {
  return url(`blog/${post.id}.html`);
}

export async function getPosts() {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.{jpg,jpeg,png}', { eager: true });

export function coverImage(name?: string) {
  return name ? images[`/src/assets/images/${name}`]?.default : undefined;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Seoul' }).format(date);
}

/** 한국어 기준 1분에 500자 정도로 잡은 읽는 시간 */
export function readingMinutes(body = '') {
  return Math.max(1, Math.round(body.replace(/\s+/g, '').length / 500));
}
