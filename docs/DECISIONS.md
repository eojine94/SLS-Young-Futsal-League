# 기술/디자인 결정 기록

> 프로젝트 진행 중 내린 주요 결정과 그 근거를 기록합니다.

---

## DR-001: CSS 변수 체계를 pencil.pen 디자인 토큰 기준으로 통일

- **일시**: 2026-02-11
- **상태**: 채택

### 배경

shadcn/ui 초기화 시 기본 neutral 테마의 oklch 색상값이 자동 생성되었다. 그런데 pencil.pen 디자인 시스템에는 별도의 디자인 토큰(hex 값)이 정의되어 있어서, 두 체계가 불일치하는 상황이 발생했다.

### 비교

| 항목 | shadcn 기본값 | pencil.pen 토큰 |
|------|--------------|----------------|
| primary (포인트 컬러) | oklch(0.205 0 0) — 거의 검정 | #2563EB — 블루 |
| foreground (텍스트) | oklch(0.145 0 0) | #18181B |
| muted-foreground | oklch(0.556 0 0) | #71717A |
| border | oklch(0.922 0 0) | #E4E4E7 |
| destructive | oklch(0.577 0.245 27.325) | #EF4444 |

### 선택지

**A. shadcn 기본값 유지 + 코드에서 hex 하드코딩**
- 장점: shadcn 컴포넌트 그대로 사용 가능
- 단점: `text-[#2563EB]` 같은 하드코딩이 코드 전반에 퍼짐, 유지보수 어려움

**B. (채택) shadcn CSS 변수를 pencil.pen 토큰에 맞춰 재정의**
- 장점: `text-primary`, `bg-muted` 등 Tailwind 유틸리티만으로 디자인 표현 가능, 단일 진실의 원천(single source of truth)
- 단점: shadcn 기본 테마와 달라지므로 shadcn 문서 예제와 색상이 다를 수 있음

### 결정

**B안 채택**. pencil.pen이 디자인의 원본이므로, CSS 변수를 pencil.pen 토큰에 맞추고 코드에서는 Tailwind 유틸리티 클래스만 사용한다. 하드코딩 hex값은 모두 제거한다.

### 매핑 규칙

| Tailwind 클래스 | CSS 변수 | pencil.pen 토큰 | 값 |
|----------------|---------|----------------|-----|
| `text-foreground` | --foreground | text-primary | #18181B |
| `text-muted-foreground` | --muted-foreground | text-secondary | #71717A |
| `text-primary` | --primary | accent-primary | #2563EB |
| `text-primary-foreground` | --primary-foreground | text-on-accent | #FFFFFF |
| `bg-background` | --background | (커스텀) | #F4F4F5 |
| `bg-card` | --card | bg-primary | #FFFFFF |
| `bg-muted` | --muted | bg-muted | #F4F4F5 |
| `bg-accent` | --accent | bg-highlight | #EFF6FF |
| `bg-secondary` | --secondary | bg-muted | #F4F4F5 |
| `border-border` | --border | border-default | #E4E4E7 |
| `text-destructive` | --destructive | status-error | #EF4444 |

---

## DR-002: 폴더 구조 — features 기반 모듈 분리

- **일시**: 2026-02-11
- **상태**: 채택

### 배경

프로젝트 초기 세팅에서 폴더 구조를 결정해야 했다.

### 선택지

**A. pages/ + components/ 평면 구조**
- 장점: 단순
- 단점: 기능이 많아지면 관련 파일이 흩어짐

**B. (채택) features/ 기반 모듈 분리**
- 장점: 기능별로 components, hooks, types가 한곳에 모여 응집도 높음
- 단점: 초기에 폴더가 많아 보일 수 있음

### 결정

**B안 채택**. PRD에 Home, Rank, Match, Team, Auth 등 명확한 기능 단위가 있으므로 features 기반 구조가 적합하다. 공통 모듈은 shared/에 배치.

---

## DR-003: shadcn/ui 컴포넌트 경로를 shared/components/ui에 배치

- **일시**: 2026-02-11
- **상태**: 채택

### 배경

shadcn/ui는 기본적으로 `src/components/ui`에 컴포넌트를 생성한다. 프로젝트의 features 기반 폴더 구조와 맞추려면 경로를 조정해야 했다.

### 결정

`components.json`의 aliases를 수정하여 shadcn 컴포넌트가 `@shared/components/ui`에 생성되도록 했다. `@/lib/utils`는 shadcn 내부 참조 호환성을 위해 유지.
