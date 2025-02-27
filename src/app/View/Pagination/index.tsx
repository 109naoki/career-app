import { FC } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="dots-start" className="px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`rounded-lg px-3 py-1 text-sm ${
            currentPage === i
              ? "bg-primary text-primary-foreground"
              : "hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="dots-end" className="px-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages)}
          className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="mt-12 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
          currentPage === 1
            ? "text-muted-foreground cursor-not-allowed"
            : "hover:bg-secondary text-foreground"
        }`}
      >
        前へ
      </button>
      {renderPaginationButtons()}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
          currentPage === totalPages
            ? "text-muted-foreground cursor-not-allowed"
            : "hover:bg-secondary text-foreground"
        }`}
      >
        次へ
      </button>
    </div>
  );
};
