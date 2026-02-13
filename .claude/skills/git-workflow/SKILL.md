---
name: git-workflow
description: 변경된 파일들을 성격별로 나눠서 커밋 → 푸시 → PR 생성 → 리뷰 → Merge까지 자동 수행
---

# Git Workflow: 성격별 커밋 → 푸시 → PR → 리뷰 → Merge

변경된 파일들을 성격별로 분류하여 개별 커밋하고, PR 생성 후 리뷰 및 Merge까지 수행한다.

## 전체 흐름

1. **변경 파일 분석 및 분류**
2. **분류 결과 사용자 확인**
3. **성격별 개별 커밋**
4. **원격 푸시**
5. **PR 생성**
6. **PR 리뷰 → 이상 없으면 자동 Merge**

---

## Step 1: 변경 파일 분석 및 분류

`git status`와 `git diff`를 실행하여 변경된 파일 목록을 확인한다.

변경된 파일들을 아래 기준으로 성격별 그룹으로 분류한다:

| 분류 | 설명 | 커밋 prefix |
|------|------|------------|
| feat | 새로운 기능 추가 | `feat:` |
| fix | 버그 수정 | `fix:` |
| style | UI/스타일 변경 (Tailwind, CSS 등) | `style:` |
| refactor | 코드 리팩토링 (기능 변경 없음) | `refactor:` |
| chore | 설정, 빌드, 의존성 등 | `chore:` |
| docs | 문서 변경 | `docs:` |
| test | 테스트 추가/수정 | `test:` |

분류 기준:
- **파일 경로**: `src/features/*/components/` → feat 또는 style, `eslint.config.js` → chore 등
- **변경 내용**: diff 내용을 분석하여 실제 변경의 성격 파악
- **관련성**: 같은 기능에 속하는 파일들은 하나의 커밋으로 묶기

## Step 2: 분류 결과 사용자 확인

분류 결과를 사용자에게 보여주고 확인을 받는다. 반드시 AskUserQuestion 도구를 사용하여 아래 형식으로 표시:

```
커밋 1 (feat): 홈 화면 레이아웃 변경
  - src/features/home/components/Hero.tsx
  - src/features/home/index.tsx

커밋 2 (chore): ESLint 설정 업데이트
  - eslint.config.js
```

사용자가 분류를 수정하고 싶으면 조정한다.

## Step 3: 성격별 개별 커밋

사용자가 승인하면, 각 그룹별로:
1. 해당 그룹의 파일들만 `git add <파일들>` (절대로 `git add .`이나 `git add -A` 사용 금지)
2. 커밋 메시지 형식: `<prefix>: <한국어 요약>`
   - 예: `feat: 홈 화면 레이아웃 개선`
   - 예: `chore: ESLint 설정 업데이트`
3. 커밋 메시지 끝에 Co-Authored-By 추가

## Step 4: 원격 푸시

- 현재 브랜치가 main이면 새 브랜치를 생성한다
  - 브랜치명 형식: `feature/<간단한-설명>` 또는 `fix/<간단한-설명>`
  - 브랜치명은 사용자에게 확인받는다
- `git push -u origin <브랜치명>`으로 푸시

## Step 5: PR 생성

`gh pr create`로 PR을 생성한다:
- **제목**: $ARGUMENTS가 있으면 사용, 없으면 커밋 내용 기반으로 자동 생성
- **본문 형식**:
```
## Summary
- 커밋 내용 요약 (bullet points)

## Changes
- 각 커밋별 변경 사항 상세

## Test plan
- [ ] 테스트 체크리스트

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

- base 브랜치는 main으로 설정

## Step 6: PR 리뷰 → 자동 Merge

PR 생성 후 `gh pr diff`로 변경 사항을 리뷰한다:
- 코드 품질 이슈 체크
- TypeScript 타입 (`type` 사용 여부, `interface` 사용 금지)
- Tailwind CSS 규칙 준수 여부
- Import alias 사용 여부 (`@features`, `@shared`, `@services`)
- 관심사 분리 원칙 준수 여부

리뷰 결과를 사용자에게 요약해서 보여준다.

- **이상 없음** → `gh pr merge --squash` 로 바로 Merge 실행 후 로컬 브랜치를 main으로 전환하고 pull
- **이슈 발견** → 리뷰 이슈 내용을 사용자에게 보고하고 워크플로우 중단 (PR은 유지)

---

## 주의사항

- 커밋 분류 단계에서만 사용자 확인을 받고, 리뷰 통과 시 Merge까지 자동 수행한다
- `.env`, `credentials`, 시크릿 파일은 절대 커밋하지 않는다
- `git add .`이나 `git add -A`는 사용하지 않는다
- 커밋 메시지는 한국어로 작성한다
- 에러 발생 시 즉시 사용자에게 알리고 중단한다
