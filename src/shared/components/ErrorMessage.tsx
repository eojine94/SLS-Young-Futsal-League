type ErrorMessageProps = {
  message?: string;
};

export function ErrorMessage({ message = '데이터를 불러오는데 실패했습니다.' }: ErrorMessageProps) {
  return (
    <div className="flex h-40 items-center justify-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
