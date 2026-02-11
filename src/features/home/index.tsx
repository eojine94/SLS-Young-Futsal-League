import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@shared/components/Header'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader onAuthClick={() => navigate('/login')} />
      <div className="px-5 py-6">
        <p className="text-sm text-[#A1A1AA]">홈 화면입니다.</p>
      </div>
    </>
  )
}
