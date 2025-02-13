"use client";
import { useFormStatus } from "react-dom";

type Props = {
  onDelete: () => Promise<void>;
};

export function DeleteButton({ onDelete }: Props) {
  const { pending } = useFormStatus();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("本当に削除しますか？")) {
      await onDelete();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      type="button"
      className="rounded-md border border-red-300 bg-red-100 px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      {pending ? "削除中..." : "削除"}
    </button>
  );
}
