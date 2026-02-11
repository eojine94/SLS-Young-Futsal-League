import { BackHeader } from '@shared/components/Header'
import { SCREEN_MAX_WIDTH } from '@shared/styles/constants'

export default function LoginPage() {
  return (
    <div
      className="mx-auto min-h-dvh bg-white shadow-lg"
      style={{ maxWidth: SCREEN_MAX_WIDTH }}
    >
      <BackHeader />
      <div className="flex flex-col items-center justify-center gap-10 px-10 pt-10">
        <p className="text-sm text-[#A1A1AA]">관리자 로그인 화면입니다.</p>
      </div>
    </div>
  )
}
