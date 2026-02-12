import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
export function Layout() {
  return (
    <div className="relative mx-auto min-h-dvh max-w-120 bg-white shadow-lg">
      <main className="pb-14">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
