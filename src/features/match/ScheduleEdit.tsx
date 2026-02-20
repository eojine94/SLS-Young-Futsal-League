import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select';
import { DeleteConfirmDialog } from '@shared/components/DeleteConfirmDialog';
import { LoadingSpinner } from '@shared/components/LoadingSpinner';
import { useTeams } from '@features/team/hooks/useTeams';
import { useMatch, useUpdateMatch, useDeleteMatch } from './hooks/useMatches';

const TIME_OPTIONS = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
];

export default function ScheduleEditPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();

  const { data: match, isLoading } = useMatch(matchId!);
  const { data: teams } = useTeams();
  const updateMatch = useUpdateMatch();
  const deleteMatch = useDeleteMatch();

  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  if (match && !initialized) {
    setHomeTeam(match.homeTeamId);
    setAwayTeam(match.awayTeamId);
    setDate(match.rawDate);
    setTime(match.time);
    setLocation(match.location);
    setInitialized(true);
  }

  if (isLoading) return <LoadingSpinner />;

  if (!match) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <p className="text-muted-foreground">경기를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!homeTeam) { toast.error('팀 A를 선택하세요.'); return; }
    if (!awayTeam) { toast.error('팀 B를 선택하세요.'); return; }
    if (homeTeam === awayTeam) { toast.error('같은 팀을 선택할 수 없습니다.'); return; }
    if (!date) { toast.error('날짜를 선택하세요.'); return; }
    if (!time) { toast.error('시간을 선택하세요.'); return; }
    if (!location.trim()) { toast.error('장소를 입력하세요.'); return; }

    try {
      await updateMatch.mutateAsync({
        id: matchId!,
        team_a_id: homeTeam,
        team_b_id: awayTeam,
        match_date: date,
        match_time: time,
        location: location.trim(),
      });
      toast.success('일정이 수정되었습니다.');
      navigate('/match');
    } catch {
      toast.error('일정 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMatch.mutateAsync(matchId!);
      toast.success('일정이 삭제되었습니다.');
      navigate('/match');
    } catch {
      toast.error('일정 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center gap-3 px-5">
        <button onClick={() => navigate(-1)} className="-ml-1 cursor-pointer p-1 text-foreground">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">일정 수정</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-6 px-5 py-6">
        {/* Guide Text */}
        <div className="flex flex-col gap-1 pb-2">
          <h2 className="text-base font-semibold text-foreground">경기 일정 수정</h2>
          <p className="text-xs text-muted-foreground">
            일정 정보를 수정한 후 저장하세요.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* 팀 A */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">팀 A</label>
            <Select value={homeTeam} onValueChange={setHomeTeam}>
              <SelectTrigger className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-none focus:border-primary focus:ring-0">
                <SelectValue placeholder="팀을 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {teams?.map((team) => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 팀 B */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">팀 B</label>
            <Select value={awayTeam} onValueChange={setAwayTeam}>
              <SelectTrigger className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-none focus:border-primary focus:ring-0">
                <SelectValue placeholder="팀을 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {teams?.map((team) => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 날짜 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="match-date" className="text-sm font-semibold text-foreground">날짜</label>
            <input
              id="match-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 rounded-xl border border-border px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>

          {/* 시간 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">시간</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-none focus:border-primary focus:ring-0">
                <SelectValue placeholder="시간을 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {TIME_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 장소 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="match-location" className="text-sm font-semibold text-foreground">장소</label>
            <input
              id="match-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="장소를 입력하세요"
              className="h-12 rounded-xl border border-border px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={updateMatch.isPending}
          className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateMatch.isPending ? '수정 중...' : '일정 수정'}
        </button>

        {/* Delete Button */}
        <button
          onClick={() => setDeleteOpen(true)}
          disabled={deleteMatch.isPending}
          className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-red-500 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleteMatch.isPending ? '삭제 중...' : '일정 삭제'}
        </button>
      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        description="일정을 삭제하면 해당 경기의 선수 기록도 함께 삭제됩니다."
        isPending={deleteMatch.isPending}
      />
    </>
  );
}
