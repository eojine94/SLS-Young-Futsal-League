import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select';
import { useCreatePlayers } from './hooks/usePlayers';

type PlayerForm = {
  name: string;
  number: string;
  role: 'leader' | 'member';
};

const createEmptyForm = (): PlayerForm => ({
  name: '',
  number: '0',
  role: 'member',
});

export default function PlayerCreatePage() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const createPlayers = useCreatePlayers();

  const [forms, setForms] = useState<PlayerForm[]>([createEmptyForm()]);

  const updateForm = (index: number, field: keyof PlayerForm, value: string) => {
    setForms((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  };

  const addForm = () => {
    setForms((prev) => [...prev, createEmptyForm()]);
  };

  const removeForm = (index: number) => {
    if (forms.length <= 1) return;
    setForms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    for (let i = 0; i < forms.length; i++) {
      if (!forms[i].name.trim()) {
        toast.error(`선수 ${i + 1}의 이름을 입력하세요.`);
        return;
      }
    }
    try {
      await createPlayers.mutateAsync(
        forms.map((f) => ({
          name: f.name.trim(),
          number: Number(f.number),
          team_id: teamId!,
          role: f.role,
        })),
      );
      toast.success('선수가 등록되었습니다.');
      navigate(`/team/${teamId}`);
    } catch {
      toast.error('선수 등록에 실패했습니다.');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center gap-3 px-5">
        <button onClick={() => navigate(-1)} className="-ml-1 cursor-pointer p-1 text-foreground">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">선수 추가</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-6 px-5 py-6">
        {/* Guide Text */}
        <div className="flex flex-col gap-1 pb-2">
          <h2 className="text-base font-semibold text-foreground">선수 등록</h2>
          <p className="text-xs text-muted-foreground">
            여러 명의 선수를 한 번에 등록할 수 있습니다.
          </p>
        </div>

        {/* Player Cards */}
        <div className="flex flex-col gap-4">
          {forms.map((form, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl border border-border p-4"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">선수 {index + 1}</span>
                {forms.length > 1 && (
                  <button
                    onClick={() => removeForm(index)}
                    className="cursor-pointer text-muted-foreground/60"
                  >
                    <X className="size-5" />
                  </button>
                )}
              </div>

              {/* Name + Number Row */}
              <div className="flex gap-3">
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground">이름</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm(index, 'name', e.target.value)}
                    placeholder="이름 입력"
                    className="h-12 rounded-xl border border-border px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </div>
                <div className="flex w-25 shrink-0 flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground">등번호</label>
                  <input
                    type="number"
                    min="0"
                    value={form.number}
                    onChange={(e) => updateForm(index, 'number', e.target.value)}
                    className="h-12 rounded-xl border border-border px-4 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Role Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">역할</label>
                <Select value={form.role} onValueChange={(v) => updateForm(index, 'role', v)}>
                  <SelectTrigger className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-none focus:border-primary focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={4}>
                    <SelectItem value="member">팀원</SelectItem>
                    <SelectItem value="leader">팀장</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <button
            onClick={addForm}
            className="flex h-11 cursor-pointer items-center justify-center rounded-lg text-sm font-medium text-muted-foreground"
          >
            + 선수 추가
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={createPlayers.isPending}
          className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createPlayers.isPending ? '등록 중...' : '선수 등록'}
        </button>
      </div>
    </>
  );
}
