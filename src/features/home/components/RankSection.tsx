import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '@shared/components/SectionTitle';
import { Skeleton } from '@shared/components/Skeleton';
import { ErrorMessage } from '@shared/components/ErrorMessage';
import { useTeamRankings, usePlayerRankings } from '@features/rank/hooks/useRankings';

type SegmentType = 'team' | 'player';

function RankSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border-[1.5px] border-border">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex h-14 items-center gap-3.5 border-b border-border px-4"
        >
          <Skeleton className="h-5 w-6" />
          <Skeleton className="h-4 w-24 flex-1" />
          <Skeleton className="h-4 w-10" />
        </div>
      ))}
      <div className="flex h-11 items-center justify-center text-sm font-medium text-muted-foreground">
        더보기
      </div>
    </div>
  );
}

export function RankSection() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<SegmentType>('team');

  const { data: teamRankings, isLoading: isTeamLoading, error: teamError } = useTeamRankings();
  const { data: playerRankings, isLoading: isPlayerLoading, error: playerError } = usePlayerRankings();

  const isLoading = segment === 'team' ? isTeamLoading : isPlayerLoading;
  const error = segment === 'team' ? teamError : playerError;

  const topTeams = useMemo(() => {
    if (!teamRankings) return [];
    return [...teamRankings]
      .sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name, 'ko'))
      .slice(0, 3);
  }, [teamRankings]);

  const topPlayers = useMemo(() => {
    if (!playerRankings) return [];
    return [...playerRankings]
      .sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name, 'ko'))
      .slice(0, 3);
  }, [playerRankings]);

  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title="순위" />

      {/* Segmented Control */}
      <div className="relative flex h-11 gap-1 rounded-xl border-[1.5px] border-border p-1">
        {/* Sliding indicator */}
        <div
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-2px)] rounded-lg bg-primary"
          style={{
            transform: segment === 'player' ? 'translateX(calc(100% + 4px))' : 'translateX(0)',
            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <button
          className={`relative z-10 flex flex-1 items-center justify-center rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-200 ${
            segment === 'team' ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}
          onClick={() => setSegment('team')}
        >
          팀별
        </button>
        <button
          className={`relative z-10 flex flex-1 items-center justify-center rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-200 ${
            segment === 'player' ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}
          onClick={() => setSegment('player')}
        >
          개인별
        </button>
      </div>

      {/* Rank List */}
      {isLoading ? (
        <RankSkeleton />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <div className="overflow-hidden rounded-xl border-[1.5px] border-border">
          {segment === 'team'
            ? topTeams.map((item, index) => (
                <div
                  key={item.id}
                  className="flex h-14 items-center gap-3.5 border-b border-border px-4"
                >
                  <span className="w-6 text-center text-base font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-foreground">
                    {item.name}
                  </span>
                  <span className="text-sm font-semibold text-primary">{item.wins}승</span>
                </div>
              ))
            : topPlayers.map((item, index) => (
                <div
                  key={item.id}
                  className="flex h-14 items-center gap-3.5 border-b border-border px-4"
                >
                  <span className="w-6 text-center text-base font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[15px] font-medium text-foreground">
                      {item.number}. {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.teamName}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{item.goals}골</span>
                </div>
              ))}

          {/* 더보기 */}
          <button
            className="flex h-11 w-full items-center justify-center text-sm font-medium text-muted-foreground cursor-pointer"
            onClick={() => navigate('/rank')}
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
}
