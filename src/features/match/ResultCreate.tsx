import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, X, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_PLAYERS } from '@features/team/mocks';
import { MOCK_MATCHES } from './mocks';
import { PlayerSelectSheet } from './components/PlayerSelectSheet';
import type { PlayerRecord } from './types';

export default function ResultCreatePage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();

  const match = MOCK_MATCHES.find((m) => m.id === matchId);
  const isEdit = match?.hasResult ?? false;

  const [homeScore, setHomeScore] = useState(() =>
    match?.homeScore !== undefined ? String(match.homeScore) : '0',
  );
  const [awayScore, setAwayScore] = useState(() =>
    match?.awayScore !== undefined ? String(match.awayScore) : '0',
  );
  const [homeRecords, setHomeRecords] = useState<PlayerRecord[]>([]);
  const [awayRecords, setAwayRecords] = useState<PlayerRecord[]>([]);

  const [sheetSide, setSheetSide] = useState<'home' | 'away' | null>(null);

  const homePlayers = useMemo(
    () => (match ? MOCK_PLAYERS.filter((p) => p.teamId === match.homeTeamId) : []),
    [match],
  );

  const awayPlayers = useMemo(
    () => (match ? MOCK_PLAYERS.filter((p) => p.teamId === match.awayTeamId) : []),
    [match],
  );

  if (!match) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <p className="text-muted-foreground">경기를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const removeRecord = (side: 'home' | 'away', playerId: string) => {
    const setter = side === 'home' ? setHomeRecords : setAwayRecords;
    setter((prev) => prev.filter((r) => r.playerId !== playerId));
  };

  const handleSheetConfirm = (
    selections: { playerId: string; goals: number; assists: number }[],
  ) => {
    if (!sheetSide) return;
    const players = sheetSide === 'home' ? homePlayers : awayPlayers;
    const setter = sheetSide === 'home' ? setHomeRecords : setAwayRecords;

    const newRecords: PlayerRecord[] = selections.map((s) => {
      const player = players.find((p) => p.id === s.playerId)!;
      return {
        playerId: player.id,
        playerName: player.name,
        playerNumber: player.number,
        goals: s.goals,
        assists: s.assists,
      };
    });

    setter((prev) => [...prev, ...newRecords]);
    setSheetSide(null);
  };

  const handleSubmit = () => {
    if (homeScore === '' || awayScore === '') {
      toast.error('스코어를 입력하세요.');
      return;
    }
    // TODO: Phase 4에서 Supabase 연동
    toast.success(isEdit ? '결과가 수정되었습니다.' : '결과가 등록되었습니다.');
    navigate('/match');
  };

  const existingRecordPlayerIds = (side: 'home' | 'away') => {
    const records = side === 'home' ? homeRecords : awayRecords;
    return records.map((r) => r.playerId);
  };

  const homeGoalSum = homeRecords.reduce((sum, r) => sum + r.goals, 0);
  const awayGoalSum = awayRecords.reduce((sum, r) => sum + r.goals, 0);
  const homeScoreNum = Number(homeScore) || 0;
  const awayScoreNum = Number(awayScore) || 0;
  const hasHomeMismatch = homeRecords.length > 0 && homeGoalSum !== homeScoreNum;
  const hasAwayMismatch = awayRecords.length > 0 && awayGoalSum !== awayScoreNum;

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center gap-3 px-5">
        <button onClick={() => navigate(-1)} className="-ml-1 cursor-pointer p-1 text-foreground">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">
          {isEdit ? '결과 수정' : '결과 등록'}
        </h1>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-6 px-5 py-6">
        {/* Guide */}
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-foreground">
            {isEdit ? '경기 결과 수정' : '경기 결과 등록'}
          </h2>
          <p className="text-[13px] text-muted-foreground">
            팀 스코어와 선수별 기록(골, 도움)을 입력하세요.
          </p>
          <p className="text-sm font-semibold text-foreground">
            {match.date} {match.time}  {match.location}
          </p>
        </div>

        {/* Score Input */}
        <div className="flex items-center gap-6 rounded-2xl border-[1.5px] border-border p-5">
          {/* Home */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{match.homeTeam}</span>
            <input
              type="number"
              min="0"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              className="h-12 w-16 rounded-lg border-[1.5px] border-border text-center text-2xl font-bold text-foreground outline-none focus:border-primary"
            />
          </div>
          <span className="text-base font-semibold text-muted-foreground/60">vs</span>
          {/* Away */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{match.awayTeam}</span>
            <input
              type="number"
              min="0"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              className="h-12 w-16 rounded-lg border-[1.5px] border-border text-center text-2xl font-bold text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Home Team Records */}
        <TeamRecordSection
          teamName={match.homeTeam}
          records={homeRecords}
          hasAvailablePlayers={
            homePlayers.filter((p) => !homeRecords.some((r) => r.playerId === p.id)).length > 0
          }
          onOpenSheet={() => setSheetSide('home')}
          onRemoveRecord={(playerId) => removeRecord('home', playerId)}
        />

        {/* Away Team Records */}
        <TeamRecordSection
          teamName={match.awayTeam}
          records={awayRecords}
          hasAvailablePlayers={
            awayPlayers.filter((p) => !awayRecords.some((r) => r.playerId === p.id)).length > 0
          }
          onOpenSheet={() => setSheetSide('away')}
          onRemoveRecord={(playerId) => removeRecord('away', playerId)}
        />

        {/* Goal Mismatch Warning */}
        {(hasHomeMismatch || hasAwayMismatch) && (
          <div className="flex items-start gap-2 rounded-xl bg-orange-50 px-4 py-3">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-orange-500" />
            <div className="flex flex-col gap-0.5 text-[13px] text-orange-700">
              {hasHomeMismatch && (
                <span>
                  {match.homeTeam}: 개인 골 합계({homeGoalSum})와 팀 스코어({homeScoreNum})가 다릅니다.
                </span>
              )}
              {hasAwayMismatch && (
                <span>
                  {match.awayTeam}: 개인 골 합계({awayGoalSum})와 팀 스코어({awayScoreNum})가 다릅니다.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white"
        >
          {isEdit ? '결과 수정' : '결과 등록'}
        </button>
      </div>

      {/* Player Select Bottom Sheet */}
      <PlayerSelectSheet
        open={sheetSide !== null}
        teamName={sheetSide === 'home' ? match.homeTeam : match.awayTeam}
        players={sheetSide === 'home' ? homePlayers : awayPlayers}
        existingRecordPlayerIds={existingRecordPlayerIds(sheetSide ?? 'home')}
        onClose={() => setSheetSide(null)}
        onConfirm={handleSheetConfirm}
      />
    </>
  );
}

type TeamRecordSectionProps = {
  teamName: string;
  records: PlayerRecord[];
  hasAvailablePlayers: boolean;
  onOpenSheet: () => void;
  onRemoveRecord: (playerId: string) => void;
};

function TeamRecordSection({
  teamName,
  records,
  hasAvailablePlayers,
  onOpenSheet,
  onRemoveRecord,
}: TeamRecordSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-foreground">{teamName} 기록</span>
        {hasAvailablePlayers && (
          <button
            onClick={onOpenSheet}
            className="cursor-pointer text-[13px] font-medium text-primary"
          >
            + 기록 추가
          </button>
        )}
      </div>

      {/* Records List */}
      {records.length > 0 && (
        <div className="overflow-hidden rounded-xl border-[1.5px] border-border">
          {records.map((record, index) => (
            <div
              key={record.playerId}
              className={`flex items-center justify-between px-3.5 py-3 ${
                index < records.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <span className="text-sm font-medium text-foreground">
                {record.playerNumber}. {record.playerName}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-semibold text-primary">
                  골 {record.goals}
                </span>
                <span className="text-[13px] text-muted-foreground">
                  도움 {record.assists}
                </span>
                <button
                  onClick={() => onRemoveRecord(record.playerId)}
                  className="cursor-pointer text-muted-foreground/60"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
