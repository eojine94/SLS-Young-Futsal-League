import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Layout } from '@shared/components/Layout'
import HomePage from '@features/home/index'
import RankPage from '@features/rank/index'
import MatchPage from '@features/match/index'
import TeamPage from '@features/team/index'
import LoginPage from '@features/auth/index'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/rank" element={<RankPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/team" element={<TeamPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
