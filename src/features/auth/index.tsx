import { BackHeader } from '@shared/components/Header';
export default function LoginPage() {
  return (
    <div className="mx-auto min-h-dvh max-w-120 bg-white shadow-lg">
      <BackHeader />
      <div className="flex flex-col items-center justify-center gap-10 px-10 pt-10">
        <p className="text-sm text-muted-foreground">관리자 로그인 화면입니다.</p>
      </div>
    </div>
  );
}
