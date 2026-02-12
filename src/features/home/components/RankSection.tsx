import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '@shared/components/SectionTitle';

type TeamRank = {
  rank: number;
  name: string;
  wins: number;
};

type PlayerRank = {
  rank: number;
  name: string;
  team: string;
  goals: number;
};

const MOCK_TEAM_RANKS: TeamRank[] = [
  { rank: 1, name: 'FC Thunder', wins: 8 },
  { rank: 2, name: 'FC Storm', wins: 7 },
  { rank: 3, name: 'FC Lightning', wins: 5 },
];

const MOCK_PLAYER_RANKS: PlayerRank[] = [
  { rank: 1, name: '0. 홍길동', team: 'FC Thunder', goals: 12 },
  { rank: 2, name: '7. 김철수', team: 'FC Storm', goals: 9 },
  { rank: 3, name: '10. 이영희', team: 'FC Lightning', goals: 7 },
];

type SegmentType = 'team' | 'player';

export function RankSection() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<SegmentType>('team');

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
      <div className="overflow-hidden rounded-xl border-[1.5px] border-border">
        {segment === 'team'
          ? MOCK_TEAM_RANKS.map((item) => (
              <div
                key={item.rank}
                className="flex h-14 items-center gap-3.5 border-b border-border px-4"
              >
                <span className="w-6 text-center text-base font-semibold text-primary">
                  {item.rank}
                </span>
                <span className="flex-1 text-[15px] font-medium text-foreground">
                  {item.name}
                </span>
                <span className="text-sm font-semibold text-primary">{item.wins}승</span>
              </div>
            ))
          : MOCK_PLAYER_RANKS.map((item) => (
              <div
                key={item.rank}
                className="flex h-14 items-center gap-3.5 border-b border-border px-4"
              >
                <span className="w-6 text-center text-base font-semibold text-primary">
                  {item.rank}
                </span>
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[15px] font-medium text-foreground">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.team}</span>
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
    </section>
  );
}
