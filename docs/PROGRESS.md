# 개발 진행 상황

> 이 문서는 각 Phase별 완료 상태를 추적합니다. GitHub에 푸시할 때마다 업데이트합니다.

## Phase 요약

| Phase | 상태 | 마지막 업데이트 |
|-------|------|----------------|
| 1. 디자인 | ✅ 완료 | 2026-02-13 |
| 2. 프로젝트 세팅 및 UI 퍼블리싱 | ✅ 완료 | 2026-02-13 |
| 3. Mock 데이터 연동 | ⏭️ 스킵 | 2026-02-13 |
| 4. Supabase 연동 | ✅ 완료 | 2026-02-13 |
| 5. CI/CD 및 배포 | ✅ 완료 | 2026-02-13 |
| 6. 개선 및 폴리싱 | 🔧 진행 중 | 2026-02-13 |

---

## Phase 1 — 디자인 ✅

- `pencil.pen` 파일에 전체 화면 디자인 완료
- 디자인 시스템 정의 (색상, 타이포, 컴포넌트)
- 화면별 UI 디자인: Home, Rank, Match, Team(관리자)

## Phase 2 — 프로젝트 세팅 및 UI 퍼블리싱 ✅

- Vite + React 19 + TypeScript 프로젝트 구성
- Tailwind CSS v4 + shadcn/ui 설정
- 폴더 구조 및 React Router v7 라우팅 설정
- 공통 컴포넌트 구현: Layout, Header, BottomNav, Button, Input, Select 등
- 모든 화면 UI 퍼블리싱 완료 (Home, Rank, Match, Team, Login)
- 관리자 CRUD 하위 페이지 전부 구현 (TeamCreate, TeamEdit, PlayerManage, PlayerCreate, PlayerEdit, ScheduleCreate, ScheduleEdit, ResultCreate)

## Phase 3 — Mock 데이터 연동 ⏭️ 스킵

- Phase 4(Supabase 연동)로 바로 진행하여 스킵

## Phase 4 — Supabase 연동 ✅

- Supabase 프로젝트 생성 및 DB 스키마 구성 (teams, players, matches, player_records)
- Supabase Auth 연동 (이메일/비밀번호 로그인)
- API 서비스 레이어 구현 (teamApi, playerApi, matchApi, rankApi, playerRecordApi)
- TanStack Query 훅 연동 (데이터 fetching + mutation + 캐시 무효화)
- FK cascade 삭제 처리

## Phase 5 — CI/CD 및 배포 ✅

- GitHub 리포지토리 연동 (`eojine94/SLS-Young-Futsal-League`)
- Vercel 프로젝트 연결 및 자동 배포 설정 (GitHub push → Vercel 자동 빌드/배포)
- 환경 변수 설정 (Supabase URL, Anon Key)

## Phase 6 — 개선 및 폴리싱 🔧 진행 중

### 완료된 항목

- [x] 전체 화면 스켈레톤 로딩 UI 적용
- [x] 에러 핸들링 (ErrorMessage 컴포넌트)
- [x] 토스트 알림 (Sonner 라이브러리)
- [x] 삭제 확인 다이얼로그 (DeleteConfirmDialog)
- [x] FK cascade 삭제 시 경고 문구 추가
- [x] Tailwind 임의값을 표준 유틸리티로 교체
- [x] ResultCreate useEffect/setState 리팩토링 및 컴포넌트 분리

### 남은 항목

- [ ] 빈 상태(Empty State) UI
- [ ] 성능 최적화
- [ ] 추가 UI 폴리싱 및 인터랙션 개선
