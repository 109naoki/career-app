import { FC } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
}) => {
  if (totalCount <= pageSize) return null;

  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
      >
        前へ
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-3 py-1 text-sm ${
            currentPage === page
              ? "bg-emerald-600 text-white"
              : "border border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
      >
        次へ
      </button>
    </div>
  );
};
