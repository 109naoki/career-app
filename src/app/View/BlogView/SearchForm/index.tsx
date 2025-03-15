import { FC } from "react";
import { Search } from "lucide-react";

type Props = {
  onSearchChange: (value: string) => void;
};

export const SearchForm: FC<Props> = ({ onSearchChange }) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timerId = setTimeout(() => {
      onSearchChange(e.target.value);
    }, 500);

    return () => clearTimeout(timerId);
  };

  return (
    <div className="bg-card mb-8 rounded-xl p-6 shadow-lg">
      <div className="relative">
        <Search className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
        <input
          type="text"
          placeholder="タイトルや内容で検索..."
          onChange={handleSearchInput}
          className="border-input placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border bg-background px-10 py-3 text-foreground shadow-sm transition-colors focus:outline-none focus:ring-1"
        />
      </div>
    </div>
  );
};
