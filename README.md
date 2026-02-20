# SLS FUTSAL LEAGUE

> 풋살 리그 정보 확인 서비스 — 순위, 경기 일정, 결과를 한눈에

## 서비스 소개

풋살 리그의 팀 순위, 경기 일정, 결과를 누구나 쉽게 확인할 수 있는 모바일 웹 서비스입니다.
관리자는 팀/선수 관리, 일정 등록, 경기 결과 입력까지 하나의 앱에서 처리할 수 있습니다.

## 주요 기능

### 일반 사용자

- **홈** — 팀별/개인별 상위 순위 + 다음 경기 일정 요약
- **순위** — 전체 팀 순위 테이블, 팀 클릭 시 선수별 득점/도움 순위
- **경기** — 전체 경기 일정 및 결과 타임라인

### 관리자

- **팀 관리** — 팀 생성/수정/삭제
- **선수 관리** — 선수 등록/수정/삭제 (다수 동시 등록 가능)
- **일정 관리** — 경기 일정 등록/수정/삭제
- **결과 등록** — 팀 스코어 + 선수별 골/도움 기록

## 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 + shadcn/ui |
| 상태 관리 | TanStack Query (React Query) |
| Backend / DB / Auth | Supabase (PostgreSQL + Auth) |
| Hosting | Vercel |

## 시작하기

### 사전 요구사항

- Node.js 18+
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 환경 변수

프로젝트 루트에 `.env` 파일을 생성하고 Supabase 정보를 설정합니다.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 프로젝트 구조

```
src/
├── features/              # 기능별 모듈
│   ├── home/              # 홈 (대시보드)
│   ├── rank/              # 순위
│   ├── match/             # 경기
│   └── team/              # 팀 관리 (관리자 전용)
├── shared/                # 공용 모듈
│   ├── components/        # 공통 컴포넌트 (Layout, BottomNav 등)
│   ├── hooks/             # 공통 훅
│   ├── types/             # 공통 타입
│   ├── utils/             # 유틸 함수
│   └── styles/            # 글로벌 스타일, 상수
├── services/              # Supabase API 호출
├── App.tsx
└── main.tsx
```

각 feature 모듈은 `components/`, `hooks/`, `types/`, `index.tsx`로 구성됩니다.

## 데이터 모델

```
teams ─┬─< players
       ├─< matches (team_a)
       └─< matches (team_b)

matches ─< player_records
players ─< player_records
```

| 테이블 | 설명 |
|--------|------|
| `teams` | 팀 정보 (팀명) |
| `players` | 선수 정보 (이름, 등번호, 역할) |
| `matches` | 경기 정보 (대진, 날짜, 시간, 장소, 스코어) |
| `player_records` | 선수별 경기 기록 (골, 도움) |

## 사용자 역할

| 역할 | 접근 가능 화면 | 인증 |
|------|--------------|------|
| 일반 사용자 | Home, Rank, Match | 불필요 |
| 관리자 | Home, Rank, Match, Team | Supabase Auth (이메일/비밀번호) |

## 문서

- [상세 기획서 (PRD)](./docs/PRD.md)
- [개발 진행 상황](./docs/PROGRESS.md)
