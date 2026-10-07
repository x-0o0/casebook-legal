# casebook-legal

Casebook 앱의 문서 사이트예요. 홈, 개인정보 처리방침, 이용약관, 개발 블로그가 있어요.
[Astro](https://astro.build)로 만들고, `main`에 푸시하면 GitHub Actions가 빌드해서 GitHub Pages에 배포해요.

- 사이트: https://x-0o0.github.io/casebook-legal/
- 로컬 실행(Node 22.12 이상): `npm install` 다음 `npm run dev`

## 지켜야 할 규칙

### 주소는 바꾸지 않아요

`privacy.html`, `terms.html`, `#support` 주소는 App Store Connect에 등록돼 있어요.

- 파일 이름과 주소를 바꾸지 마세요. `astro.config.mjs`의 `build.format: 'preserve'`가 이 주소를 지켜요.
- 배포 workflow는 빌드 결과에 두 파일이 없으면 배포를 멈춰요.
- 처리방침의 절 앵커(`#p1`~`#p12`)도 홈에서 링크하고 있으니 그대로 둬요.

### 처리방침 · 약관 본문은 함부로 고치지 않아요

`src/pages/privacy.astro`와 `src/pages/terms.astro`의 본문은 법적 문서예요. 레이아웃만 고치고, 문구를 바꾸려면 운영팀의 승인을 먼저 받으세요.

### 개발 블로그 글

글은 `src/content/blog/`에 마크다운으로 써요. 파일 이름이 주소가 돼요(`blog/<파일 이름>.html`).

```yaml
---
title: "동사로 시작하는 작업형 제목"
date: 2026-10-06
category: 개발일지        # 개발일지 | 작업 기록 | 릴리스 노트
summary: 한 줄 요약
cover: some-cover.webp    # src/assets/images 안의 파일 이름
author: taekssi           # 선택. 적으면 글 화면 머리 줄에 "글 taekssi"로 보여요
---
```

- **개발일지는 모두 같은 커버를 써요.** `개발일지` 글은 `cover`를 비워 두면 자동으로 `devlog-cover.webp`가 들어가요. 다른 그림을 적으면 빌드가 실패해요. 이 규칙은 `src/content.config.ts`에 들어 있어요.
- 다른 카테고리는 `src/assets/images/`에 그림을 넣고 `cover`에 파일 이름을 적어요.
- `author`는 선택이에요. 운영자가 아닌 사람이 쓴 글에 적어요. 실명 대신 공개해도 되는 필명을 써요.
- 쓰지 않게 된 그림 파일도 지우지 말고 둬요.
- 톤은 Apple Developer Article처럼 써요.
  - 동사형 제목, 한 줄 요약, 개요, 작업형 소제목
  - 필요하면 `> **중요:**` · `> **참고:**` 상자와 짧은 코드
  - 합니다체로 쓰고, 3분 안에 읽히게 써요.
- 이메일, 사용자 · 계정 식별자, 서버 테이블 이름 · SQL, 운영 채널, 비밀 값 이름, 커밋 번호 같은 내부 정보는 쓰지 않아요.

### 그 밖에

- 홈에는 이메일 주소를 쓰지 않아요. 연락처는 처리방침의 "11. 개인정보 보호책임자"에만 있어요.
- RSS는 쓰지 않아요.
- App Store · TestFlight 링크는 `src/consts.ts`의 `APP_STORE_URL`, `TESTFLIGHT_URL`에서 바꿔요.
