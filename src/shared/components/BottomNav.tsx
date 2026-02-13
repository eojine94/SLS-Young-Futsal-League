import { NavLink } from 'react-router-dom';
import { Home, Trophy, Calendar, Users } from 'lucide-react';
import { useAuth } from '@shared/hooks/useAuth';

const NAV_ITEMS = [
  { to: '/', label: '홈', icon: Home },
  { to: '/rank', label: '순위', icon: Trophy },
  { to: '/match', label: '경기', icon: Calendar },
] as const;

const ADMIN_NAV_ITEM = { to: '/team', label: '팀', icon: Users } as const;

export function BottomNav() {
  const { isAdmin } = useAuth();
  const items = isAdmin ? [...NAV_ITEMS, ADMIN_NAV_ITEM] : NAV_ITEMS;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-120 z-40">
      <div className="rounded-t-2xl border border-b-0 border-border bg-card p-1">
        <ul className="flex justify-around items-center">
          {items.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 py-2 px-3.5 text-xs transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                  }`
                }
              >
                <Icon className="size-5.5" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-card pb-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
