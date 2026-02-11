import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { SCREEN_MAX_WIDTH } from '@shared/styles/constants'

export function Layout() {
  return (
    <div
      className="relative mx-auto min-h-dvh bg-white shadow-lg"
      style={{ maxWidth: SCREEN_MAX_WIDTH }}
    >
      <main className="pb-14">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
