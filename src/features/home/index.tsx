import { PageHeader } from '@shared/components/Header';
import { RankSection } from './components/RankSection';
import { ScheduleSection } from './components/ScheduleSection';

export default function HomePage() {
  return (
    <>
      <PageHeader />
      <div className="flex flex-col gap-8 px-5 py-6">
        <RankSection />
        <ScheduleSection />
      </div>
    </>
  );
}
