import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select';
import { MOCK_TEAMS } from '@features/team/mocks';

const TIME_OPTIONS = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];

export default function ScheduleCreatePage() {
  const navigate = useNavigate();

  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    if (!homeTeam) {
      toast.error('팀 A를 선택하세요.');
      return;
    }
    if (!awayTeam) {
      toast.error('팀 B를 선택하세요.');
      return;
    }
    if (homeTeam === awayTeam) {
      toast.error('같은 팀을 선택할 수 없습니다.');
      return;
    }
    if (!date) {
      toast.error('날짜를 선택하세요.');
      return;
    }
    if (!time) {
      toast.error('시간을 선택하세요.');
      return;
    }
    if (!location.trim()) {
      toast.error('장소를 입력하세요.');
      return;
    }
    // TODO: Phase 4에서 Supabase 연동
    toast.success('일정이 등록되었습니다.');
    navigate('/match');
  };

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center gap-3 px-5">
        <button onClick={() => navigate(-1)} className="-ml-1 cursor-pointer p-1 text-foreground">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">일정 등록</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-6 px-5 py-6">
        {/* Guide Text */}
        <div className="flex flex-col gap-1 pb-2">
          <h2 className="text-base font-semibold text-foreground">새 경기 일정 등록</h2>
          <p className="text-[13px] text-muted-foreground">
            경기에 참여하는 두 팀과 일정을 입력해 주세요.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* 팀 A */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">팀 A</label>
            <Select value={homeTeam} onValueChange={setHomeTeam}>
              <SelectTrigger className="h-12 w-full rounded-xl border-[1.5px] border-border bg-white px-4 text-sm text-foreground shadow-none focus:border-primary focus:ring-0">
                <SelectValue placeholder="팀을 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {MOCK_TEAMS.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 팀 B */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">팀 B</label>
            <Select value={awayTeam} onValueChange={setAwayTeam}>
              <SelectTrigger className="h-12 w-full rounded-xl border-[1.5px] border-border bg-white px-4 text-sm text-foreground shadow-none focus:border-primary focus:ring-0">
                <SelectValue placeholder="팀을 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {MOCK_TEAMS.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 날짜 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">날짜</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 rounded-xl border-[1.5px] border-border px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>

          {/* 시간 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">시간</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="h-12 w-full rounded-xl border-[1.5px] border-border bg-white px-4 text-sm text-foreground shadow-none focus:border-primary focus:ring-0">
                <SelectValue placeholder="시간을 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {TIME_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 장소 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">장소</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="장소를 입력하세요"
              className="h-12 rounded-xl border-[1.5px] border-border px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white"
        >
          일정 등록
        </button>
      </div>
    </>
  );
}
