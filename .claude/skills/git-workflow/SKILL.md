---
name: git-workflow
description: 변경된 파일들을 성격별로 나눠서 브랜치 생성 → 커밋 → 푸시 → PR 생성 → 리뷰 → Merge까지 자동 수행
---

# Git Workflow: 성격별 브랜치 → 커밋 → 푸시 → PR → 리뷰 → Merge

변경된 파일들을 성격별로 분류하여 각 그룹마다 개별 브랜치를 생성하고, 커밋 → 푸시 → PR → 리뷰 → Merge를 반복 수행한다.

## 전체 흐름

1. **변경 파일 분석 및 분류**
2. **분류 결과 출력** (브랜치명 포함, 확인 없이 바로 진행)
3. **그룹별 반복: 브랜치 생성 → 커밋 → 푸시 → PR → 리뷰 → Merge**
   - 3a. main에서 새 브랜치 생성 및 이동
   - 3b. 해당 그룹 파일 커밋
   - 3c. 원격 푸시
   - 3d. PR 생성
   - 3e. PR 리뷰 → 이상 없으면 Merge
   - 3f. main으로 복귀 및 pull

---

## Step 1: 변경 파일 분석 및 분류

`git status`와 `git diff`를 실행하여 변경된 파일 목록을 확인한다.

변경된 파일들을 아래 기준으로 성격별 그룹으로 분류한다:

| 분류 | 설명 | 커밋 prefix | 브랜치 prefix |
|------|------|------------|--------------|
| feat | 새로운 기능 추가 | `feat:` | `feature/` |
| fix | 버그 수정 | `fix:` | `fix/` |
| style | UI/스타일 변경 (Tailwind, CSS 등) | `style:` | `style/` |
| refactor | 코드 리팩토링 (기능 변경 없음) | `refactor:` | `refactor/` |
| chore | 설정, 빌드, 의존성 등 | `chore:` | `chore/` |
| docs | 문서 변경 | `docs:` | `docs/` |
| test | 테스트 추가/수정 | `test:` | `test/` |

분류 기준:
- **파일 경로**: `src/features/*/components/` → feat 또는 style, `eslint.config.js` → chore 등
- **변경 내용**: diff 내용을 분석하여 실제 변경의 성격 파악
- **관련성**: 같은 기능에 속하는 파일들은 하나의 그룹으로 묶기

## Step 2: 분류 결과 출력

분류 결과를 브랜치명과 함께 텍스트로 출력만 하고, **사용자 확인 없이 바로 Step 3으로 진행**한다. AskUserQuestion은 사용하지 않는다.

출력 형식:
```
그룹 1 (feat) → 브랜치: feature/home-layout
  커밋: feat: 홈 화면 레이아웃 변경
  - src/features/home/components/Hero.tsx
  - src/features/home/index.tsx

그룹 2 (chore) → 브랜치: chore/eslint-config
  커밋: chore: ESLint 설정 업데이트
  - eslint.config.js
```

## Step 3: 그룹별 반복 수행

분류 결과 출력 후, **각 그룹별로 아래 3a~3f를 순서대로 반복**한다.

### Step 3a: 브랜치 생성 및 이동

1. 현재 main 브랜치에 있는지 확인한다 (첫 그룹이 아닌 경우 이전 Merge 후 main으로 돌아온 상태)
2. 해당 그룹의 변경 파일들을 `git stash push -- <파일들>`로 임시 저장한다
3. `git checkout -b <브랜치명>` 으로 main에서 새 브랜치를 생성하고 이동한다
   - 브랜치명 형식: `<브랜치 prefix><간단한-설명>` (예: `feature/home-layout`, `chore/eslint-config`)
4. `git stash pop`으로 변경 파일들을 복원한다

### Step 3b: 커밋

1. 해당 그룹의 파일들만 `git add <파일들>` (절대로 `git add .`이나 `git add -A` 사용 금지)
2. 커밋 메시지 형식: `<prefix>: <한국어 요약>`
   - 예: `feat: 홈 화면 레이아웃 개선`
   - 예: `chore: ESLint 설정 업데이트`
3. 커밋 메시지 끝에 Co-Authored-By 추가

### Step 3c: 원격 푸시

- `git push -u origin <브랜치명>`으로 푸시

### Step 3d: PR 생성

`gh pr create`로 PR을 생성한다:
- **제목**: $ARGUMENTS가 있으면 첫 번째 그룹에 사용, 없으면 커밋 내용 기반으로 자동 생성
- **본문 형식**:
```
## Summary
- 커밋 내용 요약 (bullet points)

## Changes
- 변경 사항 상세

## Test plan
- [ ] 테스트 체크리스트

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```
- base 브랜치는 main으로 설정

### Step 3e: PR 리뷰 → Merge

PR 생성 후 `gh pr diff`로 변경 사항을 리뷰한다.

**코드 컨벤션 체크:**
- 코드 품질 이슈 체크
- TypeScript 타입 (`type` 사용 여부, `interface` 사용 금지)
- Tailwind CSS 규칙 준수 여부
- Import alias 사용 여부 (`@features`, `@shared`, `@services`)
- 관심사 분리 원칙 준수 여부

**Test plan 체크:**
- PR 본문의 `## Test plan` 항목들을 diff 기반으로 검증한다
- 각 항목에 대해 코드 변경이 해당 기능을 올바르게 구현/수정하는지 확인한다
- 검증 가능한 항목은 체크 표시(`[x]`), 코드만으로 확인 불가한 항목은 `[ ]`로 남긴다

리뷰 결과를 `gh pr comment <PR번호> --body "<리뷰 내용>"`으로 PR에 코멘트로 남긴다.

코멘트 형식:
```
## 🤖 Code Review

### 결과: ✅ 이상 없음 / ⚠️ 이슈 발견

**코드 컨벤션:**
- [x] 코드 품질
- [x] TypeScript 타입 (type 사용, interface 금지)
- [x] Tailwind CSS 규칙 준수
- [x] Import alias 사용 (@features, @shared, @services)
- [x] 관심사 분리 원칙

**Test plan:**
- [x] (PR 본문의 Test plan 항목 — diff로 확인 완료)
- [ ] (PR 본문의 Test plan 항목 — 코드만으로 확인 불가, 수동 확인 필요)

**상세:**
(이슈가 있으면 상세 내용 기술)
```

- **이상 없음** → 리뷰 코멘트 남긴 후 `gh pr merge --squash`로 Merge 실행
- **이슈 발견** → 리뷰 코멘트 남기고 해당 그룹 워크플로우 중단 (PR은 유지, 나머지 그룹은 계속 진행)

### Step 3f: 브랜치 정리 → main 복귀 및 pull

Merge 완료 후:
1. `git checkout main`으로 main 브랜치로 복귀
2. `git branch -d <브랜치명>`으로 로컬 브랜치 삭제
3. `git push origin --delete <브랜치명>`으로 원격 브랜치 삭제
4. `git pull origin main`으로 최신 상태 동기화
4. 다음 그룹이 있으면 Step 3a로 돌아가서 반복

---

## 주의사항

- 사용자 확인 없이 분류 → 커밋 → PR → 리뷰 코멘트 → Merge까지 자동 수행한다
- 각 그룹은 **반드시 main에서 분기한 독립 브랜치**에서 작업한다
- 한 그룹의 PR 리뷰에서 이슈가 발견되어도, 나머지 그룹은 계속 진행한다
- `.env`, `credentials`, 시크릿 파일은 절대 커밋하지 않는다
- `git add .`이나 `git add -A`는 사용하지 않는다
- 커밋 메시지는 한국어로 작성한다
- 에러 발생 시 즉시 사용자에게 알리고 중단한다
