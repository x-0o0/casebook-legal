// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://x-0o0.github.io',
  base: '/casebook-legal/',
  build: {
    // App Store Connect에 등록한 privacy.html · terms.html 주소를 그대로 지키려고
    // 파일 이름을 그대로 쓴다. (privacy.astro → privacy.html, blog/index.astro → blog/index.html)
    format: 'preserve',
  },
});
