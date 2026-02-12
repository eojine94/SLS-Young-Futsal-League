# SLS FUTSAL LEAGUE

> 풋살 리그 정보 확인 서비스 (순위, 경기)

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
│   ├── match/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.tsx
│   └── team/              # 관리자 전용
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

### TypeScript 타입 선언

- **`type` 통일**: 객체 타입 선언 시 `interface` 대신 항상 `type`을 사용한다.
  - 예: `type UserProps = { name: string; age: number }`
  - `interface`는 사용하지 않는다.

### 코딩 스타일 선호도

- **관심사 분리(Separation of Concerns)**: 각 모듈, 컴포넌트, 함수는 명확한 단일 책임을 가져야 함
  - UI 로직과 비즈니스 로직 분리
  - 데이터 fetching은 hooks에서 처리 (예: `useTeamList`, `useMatchSchedule`)
  - UI 컴포넌트는 presentation에 집중
  - 유틸 함수는 순수 함수로 작성하여 테스트 용이성 확보

## 레이아웃

- 모바일 앱 스타일 고정 폭 (max-width: `screenMaxWidth` = 480px)
- PC: 화면 중앙 배치 + 그림자
- 모바일: 전체 화면
- 하단 고정 네비게이션 바

## 사용자 역할

| 역할        | 접근 가능 화면                |
| ----------- | ----------------------------- |
| 일반 사용자 | Home, Rank, Match             |
| 관리자      | 위 + Team                     |

### 관리자 모드 진입 방법

현재 Phase 3(Mock 데이터)이므로 별도 인증 없이 로그인 폼만 제출하면 관리자 모드가 활성화된다.

1. 아무 화면 우측 상단의 **열쇠(🔑) 아이콘** 클릭 → 로그인 페이지로 이동
2. 이메일·비밀번호에 **아무 값이나 입력** 후 "로그인" 클릭
3. 관리자 모드 활성화 — 하단 네비게이션에 "팀" 탭 추가, 경기 화면에 "경기 등록" 버튼 표시, 경기 카드 클릭 시 일정 수정/결과 등록 가능
4. 로그아웃: 우측 상단 **로그아웃 아이콘** 클릭 → 일반 사용자 모드로 복귀

> Phase 4에서 Supabase Auth로 전환 시 실제 인증으로 교체 예정 (`src/shared/hooks/useAuth.tsx`)

## 디자인

- **디자인 도구**: [pencil.dev](https://pencil.dev) VSCode Extension (Pencil MCP)
- **디자인 파일**: `pencil.pen` — 모든 UI 디자인의 단일 원본(Single Source of Truth)
- **구현**: Tailwind CSS + shadcn/ui로 `pencil.pen` 디자인을 코드로 구현
- **⚠️ 필수 규칙**: UI 관련 작업(신규 화면, 컴포넌트 수정, 스타일 변경 등)을 할 때는 **반드시 `pencil.pen` 파일을 Pencil MCP 도구로 먼저 확인**한 후 작업할 것. 디자인 파일에 정의된 레이아웃, 색상, 간격, 타이포그래피 등을 그대로 코드에 반영해야 한다.

## 상세 기획

👉 [docs/PRD.md](./docs/PRD.md) 참고
