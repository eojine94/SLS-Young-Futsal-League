import { PageHeader } from '@shared/components/Header'

export default function TeamPage() {
  return (
    <>
      <PageHeader showAuth={false} />
      <div className="px-5 py-6">
        <p className="text-sm text-[#A1A1AA]">팀 관리 화면입니다.</p>
      </div>
    </>
  )
}
