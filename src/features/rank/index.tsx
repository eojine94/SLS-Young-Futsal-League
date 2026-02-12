import { PageHeader } from '@shared/components/Header';
import { TeamRankTable } from './components/TeamRankTable';

export default function RankPage() {
  return (
    <>
      <PageHeader />
      <div className="px-5 py-6">
        <div className="flex flex-col gap-1 pb-2">
          <h2 className="text-base font-semibold text-foreground">리그 팀 순위</h2>
          <p className="text-[13px] text-muted-foreground">
            팀을 클릭하면 팀 내 선수 순위를 볼 수 있습니다.
          </p>
        </div>
        <TeamRankTable />
      </div>
    </>
  );
}
