import { FC } from "react";
import { Lightbulb } from "lucide-react";
import { CarrerCard } from "./CarrerCard";
import { Post } from "@/app/types/carrer";

type Props = {
  posts: Post[];
  totalPosts: number;
};

export const CarrerList: FC<Props> = ({ posts, totalPosts }) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <Lightbulb className="h-5 w-5" />
          <span>サービス一覧 ({totalPosts})</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <CarrerCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};
