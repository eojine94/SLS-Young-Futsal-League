import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BackHeader } from '@shared/components/Header';
import { useAuth } from '@shared/hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('이메일과 비밀번호를 입력하세요.');
      return;
    }
    const success = await login(email, password);
    if (success) {
      toast.success('로그인되었습니다.');
      navigate('/');
    } else {
      toast.error('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-120 flex-col bg-white shadow-lg">
      <BackHeader />

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-10 pb-[150px]">
        {/* Logo Area */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[30px] font-bold tracking-tight text-primary">SLS FUTSAL LEAGUE</h1>
          <p className="text-sm text-muted-foreground">관리자 로그인</p>
        </div>

        {/* Form Area */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          {/* 이메일 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">이메일</label>
            <input
              type="email"
              placeholder="admin@kicklog.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border-[1.5px] border-border px-4 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border-[1.5px] border-border px-4 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground cursor-pointer"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
