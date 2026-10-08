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
author: taekssi           # 글쓴이의 GitHub 이름. 글 화면 머리 줄에 "글 taekssi"로 보여요
---
```

- **개발일지는 모두 같은 커버를 써요.** `개발일지` 글은 `cover`를 비워 두면 자동으로 `devlog-cover.webp`가 들어가요. 다른 그림을 적으면 빌드가 실패해요. 이 규칙은 `src/content.config.ts`에 들어 있어요.
- 다른 카테고리는 `src/assets/images/`에 그림을 넣고 `cover`에 파일 이름을 적어요.
- `author`: 글쓴이의 GitHub 이름(프로필에 보이는 닉네임). 실명 대신 필명도 돼요. 모든 글에 적어요(운영자 글은 `x-0o0`). 적으면 글 화면 머리 줄에 "글 <이름>"으로 보여요.
- 쓰지 않게 된 그림 파일도 지우지 말고 둬요.
- 본문 그림은 `src/assets/images/`에 넣고 `![대체 텍스트](../../assets/images/파일)`로 써요. 밝은 · 어두운 모드용 그림이 따로 있으면 이름 끝을 `-light` · `-dark`로 맞춰 두 줄 다 넣어요. 화면에는 시스템 설정에 맞는 쪽만 보여요. 같은 내용의 그림을 다른 이름으로 하나 더 두지 마세요. Astro가 같은 그림을 한 파일로 합치면서 `-light` · `-dark` 이름이 사라질 수 있어요.
- 톤은 Apple Developer Article처럼 써요.
  - 동사형 제목, 한 줄 요약, 개요, 작업형 소제목
  - 필요하면 `> **중요:**` · `> **참고:**` 상자와 짧은 코드
  - 합니다체로 쓰고, 3분 안에 읽히게 써요.
- 이메일, 사용자 · 계정 식별자, 서버 테이블 이름 · SQL, 운영 채널, 비밀 값 이름, 커밋 번호 같은 내부 정보는 쓰지 않아요.

### 사건 만들기 가이드

`guide.html`(`src/pages/guide.astro`)은 사건을 직접 만드는 사람을 위한 작성 기준이에요. 상단 메뉴의 "사건 만들기"와 홈의 문서 칸에서 링크해요.

- 숫자(채점 · 힌트 방식, 난이도표, 의뢰 내용 길이)는 앱 규칙과 사건 만들기 난이도표에 맞춰요. 앱 규칙이 바뀌면 함께 고쳐요.
- 아직 앱에 없는 기능은 쓰지 않아요.
- 예시는 지어낸 사건으로만 들고, 공개 전 사건의 정답이나 기존 작품의 설정은 쓰지 않아요.

### 그 밖에

- 홈에는 이메일 주소를 쓰지 않아요. 연락처는 처리방침의 "11. 개인정보 보호책임자"에만 있어요.
- RSS는 쓰지 않아요.
- App Store · TestFlight 링크는 `src/consts.ts`의 `APP_STORE_URL`, `TESTFLIGHT_URL`에서 바꿔요.
