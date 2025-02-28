import { FC } from "react";
import { Search, Filter, Tag } from "lucide-react";

type Props = {
  categories: { id: string; name: string }[];
  selectedCategories: string[];
  onSearchChange: (value: string) => void;
  onCategoryToggle: (categoryId: string) => void;
};

export const SearchForm: FC<Props> = ({
  categories,
  selectedCategories,
  onSearchChange,
  onCategoryToggle,
}) => {
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

      <div className="mt-4">
        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
          <Filter className="h-4 w-4" />
          <span>カテゴリーでフィルター:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => onCategoryToggle(category.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Tag
                  className={`h-3.5 w-3.5 ${
                    isSelected
                      ? "text-primary-foreground"
                      : "text-secondary-foreground"
                  }`}
                />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
