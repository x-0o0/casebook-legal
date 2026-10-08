// 사건 제작 가이드를 AI 에이전트용 파일로 만든다.
//   agent/case-guide-criteria.md (기준 원본)
//   → public/casebook-press-prompt.md          (어느 AI에나 붙여 넣는 프롬프트)
//   → public/casebook-press-skill/SKILL.md     (Claude Code에 넣는 스킬)
//   → public/casebook-press-skill.zip          (Claude 앱에 올리는 스킬, 폴더째 압축)
// 이름에는 항상 -skill · -prompt를 붙인다. casebook-press만 단독으로 쓰지 않는다.
// 가이드 페이지(src/pages/guide.astro) 본문을 고치면 기준 원본도 같이 고치고 `npm run agent-files`를 실행한다.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const criteria = readFileSync(join(root, 'agent/case-guide-criteria.md'), 'utf8').trim();
const pub = join(root, 'public');

const SKILL_NAME = 'casebook-press-skill';
const PROMPT_FILE = 'casebook-press-prompt.md';
const ZIP_FILE = `${SKILL_NAME}.zip`;
const SKILL_DESCRIPTION =
  'Casebook 추리 게임의 사건(.casedoc)을 만들거나 고치거나 검토할 때 쓰는 제작 기준이에요. ' +
  '정답과 진상 시간표, 난이도(하 · 중 · 상), 의심 나누기, 단서 배치, 진술 · 선택지 · 힌트 쓰기, 표현 기준, 올리기 전 점검을 다뤄요. ' +
  '사용자가 Casebook 사건을 함께 만들자고 하거나, 사건 아이디어 · 초안 · 사건 파일을 검토해 달라고 할 때 사용해요.';

const prompt = `# Casebook 사건을 함께 만들어요

당신은 나와 함께 Casebook 추리 게임의 사건을 만드는 공동 작가예요. 아래 "사건 제작 기준"에 따라 함께 사건을 만들어요.

- 기준을 빠짐없이 지켜요. 기준에 없는 규칙을 새로 지어내지 말고, 정하기 어려운 것은 나에게 물어봐요.
- 기준대로 정답(범인 · 동기 · 수법)과 진상 시간표부터 정하고, 그다음에 증거 · 진술 · 선택지 · 힌트를 만들어요.
- 맨 끝 "내 사건 아이디어"를 읽고 시작해요. 난이도가 정해져 있지 않으면 먼저 물어봐요.

${criteria}

## 내 사건 아이디어:

(여기에 아이디어를 적어 주세요. 예: 시대 · 장소, 피해자, 원하는 난이도)
`;

const skill = `---
name: ${SKILL_NAME}
description: ${SKILL_DESCRIPTION}
---

# Casebook 사건 제작 가이드

Casebook 사건을 만들거나 검토할 때 아래 "사건 제작 기준"을 따라요.

- 사건을 만들 때: 기준대로 정답(범인 · 동기 · 수법)과 진상 시간표부터 정하고, 그다음에 증거 · 진술 · 선택지 · 힌트를 만들어요. 난이도가 정해져 있지 않으면 먼저 물어봐요.
- 사건을 검토할 때: "9. 올리기 전에 점검해요"의 항목과 각 절의 기준에 비춰 어긋나는 곳과 고칠 방법을 알려 줘요.
- 기준에 없는 규칙을 새로 지어내지 말고, 정하기 어려운 것은 사용자에게 물어봐요.

${criteria}
`;

writeFileSync(join(pub, PROMPT_FILE), prompt);
mkdirSync(join(pub, SKILL_NAME), { recursive: true });
writeFileSync(join(pub, SKILL_NAME, 'SKILL.md'), skill);
rmSync(join(pub, ZIP_FILE), { force: true });
// 압축 안에 폴더째(casebook-press-skill/SKILL.md) 들어가게 한다. -X는 macOS 확장 속성을 넣지 않는다.
execFileSync('zip', ['-X', '-r', ZIP_FILE, SKILL_NAME], { cwd: pub, stdio: 'inherit' });
console.log('agent files written to public/');
