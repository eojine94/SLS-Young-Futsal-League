import { cn } from '@/lib/utils';

type MatchCardProps = {
  teams: string;
  time: string;
  location: string;
  score?: string;
  tag?: string;
  onClick?: () => void;
};

export function MatchCard({ teams, time, location, score, tag, onClick }: MatchCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-2xl border-[1.5px] border-border p-4',
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <div className="h-10 w-[3px] shrink-0 rounded-sm bg-primary" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[15px] font-medium text-foreground">{teams}</span>
        <div className="flex items-center gap-2">
          {score && <span className="text-[13px] font-bold text-primary">{score}</span>}
          {tag && (
            <span className="rounded px-1.5 py-0.5 text-[11px] font-medium text-white bg-orange-500">
              {tag}
            </span>
          )}
          <span className="text-[13px] font-medium text-muted-foreground">{time}</span>
          <span className="text-[13px] text-zinc-400">{location}</span>
        </div>
      </div>
    </div>
  );
}
