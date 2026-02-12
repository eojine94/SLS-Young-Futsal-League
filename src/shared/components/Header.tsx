import { useNavigate } from 'react-router-dom';
import { KeyRound, LogOut, ChevronLeft } from 'lucide-react';

type PageHeaderProps = {
  title?: string;
  showAuth?: boolean;
  isAdmin?: boolean;
  onAuthClick?: () => void;
};

export function PageHeader({
  title = 'SLS FUTSAL LEAGUE',
  showAuth = true,
  isAdmin = false,
  onAuthClick,
}: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white">
      <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
      {showAuth && (
        <button onClick={onAuthClick} className="p-1 text-muted-foreground cursor-pointer">
          {isAdmin ? <LogOut className="size-6" /> : <KeyRound className="size-6" />}
        </button>
      )}
    </header>
  );
}

export function BackHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center h-14 px-5 bg-white">
      <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-foreground cursor-pointer">
        <ChevronLeft className="size-6" />
      </button>
    </header>
  );
}
