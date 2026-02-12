type SectionTitleProps = {
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionTitle({ title, action, onAction }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-sm font-medium text-primary cursor-pointer">
          {action}
        </button>
      )}
    </div>
  );
}
