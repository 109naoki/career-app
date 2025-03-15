import { FC } from "react";
import { BookOpen } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { Blog } from "@/app/types/carrer";

type Props = {
  posts: Blog[];
  totalPosts: number;
};

export const BlogList: FC<Props> = ({ posts, totalPosts }) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <BookOpen className="h-5 w-5" />
          <span>記事一覧 ({totalPosts})</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};
