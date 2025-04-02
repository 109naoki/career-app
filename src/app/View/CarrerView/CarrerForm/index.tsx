import { FC, useRef, useState, useEffect } from "react";
import { Search, Filter, Tag, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  categories: { id: string; name: string }[];
  selectedCategories: string[];
  onSearchChange: (value: string) => void;
  onCategoryToggle: (categoryId: string) => void;
};

export const CarrerForm: FC<Props> = ({
  categories,
  selectedCategories,
  onSearchChange,
  onCategoryToggle,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const timerId = setTimeout(() => {
      onSearchChange(value);
      if (value.trim() !== "" && listRef.current) {
        listRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);

    return () => clearTimeout(timerId);
  };

  const priorityCategories = [
    "転職",
    "副業",
    "エンジニア",
    "フリーランス",
    "未経験",
  ];

  // 優先カテゴリーとその他のカテゴリーに分ける
  const priorityCategoryItems = categories
    .filter((category) => priorityCategories.includes(category.name))
    .sort(
      (a, b) =>
        priorityCategories.indexOf(a.name) - priorityCategories.indexOf(b.name)
    );

  const otherCategoryItems = categories
    .filter((category) => !priorityCategories.includes(category.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  // 表示するカテゴリー
  const visibleCategories = isMobile
    ? showAllCategories
      ? [...priorityCategoryItems, ...otherCategoryItems]
      : priorityCategoryItems
    : [...priorityCategoryItems, ...otherCategoryItems];

  const hasMoreCategories = otherCategoryItems.length > 0;

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

      <div className="mt-4" ref={listRef}>
        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
          <Filter className="h-4 w-4" />
          <span>カテゴリーでフィルター:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleCategories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => onCategoryToggle(category.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Tag
                  className={`h-3.5 w-3.5 ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                />
                {category.name}
              </button>
            );
          })}

          {isMobile && hasMoreCategories && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 transition-all hover:bg-amber-200"
            >
              {showAllCategories ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  閉じる
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  その他のカテゴリー（{otherCategoryItems.length}件）
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
