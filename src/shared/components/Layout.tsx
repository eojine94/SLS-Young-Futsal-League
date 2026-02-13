import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

type LayoutProps = {
  hideNav?: boolean;
};

export function Layout({ hideNav = false }: LayoutProps) {
  return (
    <div className="relative mx-auto min-h-dvh max-w-120 bg-white shadow-lg">
      <main className={hideNav ? '' : 'pb-[calc(3.5rem+env(safe-area-inset-bottom))]'}>
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
