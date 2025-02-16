"use client";

import { useState, useMemo, FC } from "react";
import Link from "next/link";
import { Search, Briefcase, Filter } from "lucide-react";
import { Post } from "../types/carrer";

type Props = {
  initialPosts: Post[];
  categories: { id: string; name: string }[];
};

export const View: FC<Props> = ({ initialPosts, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const searchMatch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch =
        selectedCategories.length === 0 ||
        post.categories.some((cat) => selectedCategories.includes(cat.id));

      return searchMatch && categoryMatch;
    });
  }, [initialPosts, searchTerm, selectedCategories]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timerId = setTimeout(() => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timerId);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

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
          onClick={() => setCurrentPage(1)}
          className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
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
          onClick={() => setCurrentPage(i)}
          className={`rounded-lg px-3 py-1 text-sm ${
            currentPage === i
              ? "bg-primary text-primary-foreground"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
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
          onClick={() => setCurrentPage(totalPages)}
          className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ヒーローセクション */}
      <div className="from-primary/10 via-primary/5 relative mb-8 bg-gradient-to-r to-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Find Your Next Career Opportunity
            </h1>
            <p className="text-muted-foreground mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Discover the perfect role that matches your skills and
              aspirations.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 検索フォーム */}
        <div className="bg-card mb-8 rounded-xl p-6 shadow-lg">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or description..."
              onChange={handleSearchInput}
              className="border-input placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border bg-background px-10 py-3 text-foreground shadow-sm transition-colors focus:outline-none focus:ring-1"
            />
          </div>

          {/* カテゴリーフィルター */}
          <div className="mt-4">
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
              <Filter className="h-4 w-4" />
              <span>Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategories.includes(category.id)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 検索結果カウント */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Briefcase className="h-5 w-5" />
            <span>Available Positions ({filteredPosts.length})</span>
          </h2>
        </div>

        {/* 記事一覧 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.id}`}
              className="bg-card group relative overflow-hidden rounded-xl transition-all hover:shadow-lg"
            >
              {post.eyecatch && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.eyecatch.url}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-card-foreground mb-2 text-xl font-semibold">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "text-muted-foreground cursor-not-allowed"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              Previous
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "text-muted-foreground cursor-not-allowed"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
