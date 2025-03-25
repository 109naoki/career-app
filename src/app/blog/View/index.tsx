"use client";
import { FC } from "react";
import { Blog } from "@/app/types/carrer";
import { BlogView } from "@/app/View/BlogView";
type Props = {
  blogs: Blog[];
};

export const View: FC<Props> = ({ blogs }) => {
  return (
    <div className="min-h-screen bg-background">
      <BlogView blogs={blogs} />
    </div>
  );
};
