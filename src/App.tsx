import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { Layout } from '@shared/components/Layout';
import { AuthProvider } from '@shared/hooks/useAuth';
import { LoadingSpinner } from '@shared/components/LoadingSpinner';

const HomePage = lazy(() => import('@features/home/index'));
const RankPage = lazy(() => import('@features/rank/index'));
const TeamDetailPage = lazy(() => import('@features/rank/TeamDetail'));
const MatchPage = lazy(() => import('@features/match/index'));
const TeamPage = lazy(() => import('@features/team/index'));
const TeamCreatePage = lazy(() => import('@features/team/TeamCreate'));
const TeamEditPage = lazy(() => import('@features/team/TeamEdit'));
const PlayerManagePage = lazy(() => import('@features/team/PlayerManage'));
const PlayerCreatePage = lazy(() => import('@features/team/PlayerCreate'));
const PlayerEditPage = lazy(() => import('@features/team/PlayerEdit'));
const ScheduleCreatePage = lazy(() => import('@features/match/ScheduleCreate'));
const ScheduleEditPage = lazy(() => import('@features/match/ScheduleEdit'));
const ResultCreatePage = lazy(() => import('@features/match/ResultCreate'));
const LoginPage = lazy(() => import('@features/auth/index'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/rank" element={<RankPage />} />
            <Route path="/rank/:teamId" element={<TeamDetailPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/team" element={<TeamPage />} />
          </Route>
          <Route element={<Layout hideNav />}>
            <Route path="/team/create" element={<TeamCreatePage />} />
            <Route path="/team/:teamId" element={<PlayerManagePage />} />
            <Route path="/team/:teamId/edit" element={<TeamEditPage />} />
            <Route path="/team/:teamId/players/create" element={<PlayerCreatePage />} />
            <Route path="/team/:teamId/players/:playerId/edit" element={<PlayerEditPage />} />
            <Route path="/match/schedule/new" element={<ScheduleCreatePage />} />
            <Route path="/match/:matchId/schedule/edit" element={<ScheduleEditPage />} />
            <Route path="/match/:matchId/result" element={<ResultCreatePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        </Suspense>
        <Toaster
          position="bottom-center"
          richColors
          offset={{ bottom: 'calc(4.5rem + env(safe-area-inset-bottom))' }}
          mobileOffset={{ bottom: 'calc(4.5rem + env(safe-area-inset-bottom))' }}
        />
      </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
