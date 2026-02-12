type DateHeaderProps = {
  date: string;
};

export function DateHeader({ date }: DateHeaderProps) {
  return (
    <div className="flex h-9 items-center gap-3 px-1">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[13px] font-medium text-muted-foreground">{date}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
