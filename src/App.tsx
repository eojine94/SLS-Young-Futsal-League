import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { Layout } from '@shared/components/Layout';
import HomePage from '@features/home/index';
import RankPage from '@features/rank/index';
import TeamDetailPage from '@features/rank/TeamDetail';
import MatchPage from '@features/match/index';
import TeamPage from '@features/team/index';
import TeamCreatePage from '@features/team/TeamCreate';
import TeamEditPage from '@features/team/TeamEdit';
import PlayerManagePage from '@features/team/PlayerManage';
import PlayerCreatePage from '@features/team/PlayerCreate';
import PlayerEditPage from '@features/team/PlayerEdit';
import ScheduleCreatePage from '@features/match/ScheduleCreate';
import ScheduleEditPage from '@features/match/ScheduleEdit';
import ResultCreatePage from '@features/match/ResultCreate';
import LoginPage from '@features/auth/index';
import { AuthProvider } from '@shared/hooks/useAuth';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <BrowserRouter>
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
        <Toaster position="bottom-center" richColors offset={72} />
      </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
