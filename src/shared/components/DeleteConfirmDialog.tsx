import { TriangleAlert } from 'lucide-react';

type DeleteConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description?: string;
};

export function DeleteConfirmDialog({ open, onClose, onConfirm, description }: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog Card */}
      <div className="relative flex w-80 flex-col items-center gap-6 rounded-2xl bg-white p-6">
        {/* Warning Icon */}
        <div className="flex size-12 items-center justify-center rounded-full bg-red-100">
          <TriangleAlert className="size-6 text-red-500" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-bold text-foreground">정말 삭제하시겠습니까?</h3>
          <p className="whitespace-pre-line text-center text-sm text-muted-foreground">
            {description ?? '이 작업은 되돌릴 수 없습니다.\n삭제된 데이터는 복구할 수 없습니다.'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-3">
          <button
            onClick={onClose}
            className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-lg border border-border bg-white text-sm font-semibold text-foreground"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-lg bg-red-500 text-sm font-semibold text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
