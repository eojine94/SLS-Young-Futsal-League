# SLS FUTSAL LEAGUE

> 풋살 리그 정보 확인 서비스 (순위, 일정, 결과)

## 기술 스택

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **상태관리**: TanStack Query (React Query)
- **Backend/DB/Auth**: Supabase
- **Hosting**: Vercel

## 폴더 구조

```
src/
├── features/              # 기능별 모듈
│   ├── home/
│   │   ├── components/    # Home 전용 컴포넌트
│   │   ├── hooks/         # Home 전용 훅
│   │   ├── types/         # Home 전용 타입
│   │   └── index.tsx      # Home 페이지
│   ├── rank/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.tsx
│   ├── schedule/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.tsx
│   ├── team/              # 관리자 전용
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.tsx
│   └── result/            # 관리자 전용
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── index.tsx
├── shared/                # 공용 모듈
│   ├── components/        # 공통 컴포넌트 (Button, Input, Layout, BottomNav 등)
│   ├── hooks/             # 공통 훅
│   ├── types/             # 공통 타입
│   ├── utils/             # 유틸 함수
│   └── styles/            # 글로벌 스타일, 상수 (screenMaxWidth 등)
├── services/              # API 호출 (Supabase)
├── mocks/                 # Mock 데이터
├── App.tsx
└── main.tsx
```

## 명령어

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (localhost:5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 코딩 컨벤션

- 컴포넌트: PascalCase (`RankTable.tsx`)
- 함수/변수: camelCase
- 상수: UPPER_SNAKE_CASE
- 파일명: 컴포넌트는 PascalCase, 나머지는 camelCase
- 스타일: Tailwind CSS 클래스 사용, 인라인 스타일 지양
- Import: 절대경로 alias 사용 (`@features`, `@shared`, `@services`, `@mocks`)
  - 예: `import { Button } from '@shared/components/Button'`

## 레이아웃

- 모바일 앱 스타일 고정 폭 (max-width: `screenMaxWidth`)
- PC: 화면 중앙 배치 + 그림자
- 모바일: 전체 화면
- 하단 고정 네비게이션 바

## 사용자 역할

| 역할        | 접근 가능 화면       |
| ----------- | -------------------- |
| 일반 사용자 | Home, Rank, Schedule |
| 관리자      | 위 + Team, Result    |

## 디자인

- **디자인 파일**: `pencil.pen` (Pencil MCP 도구로 관리)
- **구현**: Tailwind CSS + shadcn/ui로 디자인을 코드로 구현
- 디자인 확인/수정 시 Pencil MCP 도구 사용 (절대 경로: `/Users/joshua.oh/development/soccer-record/pencil.pen`)

## 상세 기획

👉 [docs/PRD.md](./docs/PRD.md) 참고
