import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ImageIcon, Tag, ExternalLink } from "lucide-react";
import { Post } from "@/app/types/carrer";

type Props = {
  post: Post;
  imagePosition?: "top" | "center" | "bottom";
  imageStyle?: "normal" | "enhanced" | "darkened" | "lightened";
  aspectRatio?: "square" | "landscape" | "portrait";
};

export const CarrerCard: FC<Props> = ({
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

  const handleAffLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="bg-card group relative flex h-full flex-col overflow-hidden rounded-xl transition-all hover:shadow-lg">
      <Link href={`/carrer/${post.id}`} className="flex flex-grow flex-col">
        {post.eyecatch && !imageError ? (
          <div className={`relative overflow-hidden ${getAspectRatioClass()}`}>
            <Image
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={post.eyecatch.url}
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
          <div className="mb-2 flex items-center gap-4">
            <p className="text-muted-foreground text-xs">
              {post.created_at.split("T")[0]}
            </p>
            <Link
              href={post.affLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAffLinkClick}
              className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs"
            >
              <ExternalLink className="h-3 w-3" />
              公式サイト
            </Link>
          </div>
          <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow text-sm">
            {post.description.slice(0, 50)}...
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category.id}
                className="bg-secondary text-secondary-foreground flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
              >
                <Tag className="text-secondary-foreground h-3 w-3" />
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};
