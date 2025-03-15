import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ImageIcon } from "lucide-react";
import { Blog } from "@/app/types/carrer";

type Props = {
  post: Blog;
  imagePosition?: "top" | "center" | "bottom";
  imageStyle?: "normal" | "enhanced" | "darkened" | "lightened";
  aspectRatio?: "square" | "landscape" | "portrait";
};

export const BlogCard: FC<Props> = ({
  post,
  imagePosition = "center",
  imageStyle = "normal",
  aspectRatio = "landscape",
}) => {
  const [imageError, setImageError] = useState(false);

  // 画像がロードできない場合に呼ばれるエラーハンドラー
  const handleImageError = () => {
    setImageError(true);
  };

  // アスペクト比に基づいてクラスを設定
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "portrait":
        return "aspect-[3/4]";
      case "landscape":
        return "aspect-[4/3]";
      default:
        return "aspect-[4/3]";
    }
  };

  // 画像のポジションに基づいてクラスを設定
  const getObjectPositionClass = () => {
    switch (imagePosition) {
      case "top":
        return "object-top";
      case "bottom":
        return "object-bottom";
      case "center":
      default:
        return "object-center";
    }
  };

  // 画像スタイルに基づいてクラスを設定
  const getImageStyleClass = () => {
    switch (imageStyle) {
      case "enhanced":
        return "contrast-125 saturate-125";
      case "darkened":
        return "brightness-75";
      case "lightened":
        return "brightness-110";
      case "normal":
      default:
        return "";
    }
  };

  return (
    <Link
      href={`/blog/${post.id}`}
      className="bg-card group relative flex h-full flex-col overflow-hidden rounded-xl transition-all hover:shadow-lg"
    >
      {post.thumbnail && !imageError ? (
        <div className={`relative overflow-hidden ${getAspectRatioClass()}`}>
          <Image
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={post.thumbnail.url}
            alt={post.title}
            onError={handleImageError}
            className={`object-cover ${getObjectPositionClass()} ${getImageStyleClass()} transition-transform duration-300 group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      ) : (
        <div
          className={`bg-secondary/20 flex items-center justify-center ${getAspectRatioClass()}`}
        >
          <div className="text-muted-foreground flex flex-col items-center">
            <ImageIcon className="mb-2 h-10 w-10" />
            <span className="text-xs">画像がありません</span>
          </div>
        </div>
      )}
      <div className="flex flex-grow flex-col p-6">
        <h3 className="text-card-foreground mb-2 text-xl font-semibold">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-2 text-xs">
          {post.created_at.split("T")[0]}
        </p>
        <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow text-sm">
          {post.description.slice(0, 50)}...
        </p>
      </div>
    </Link>
  );
};
