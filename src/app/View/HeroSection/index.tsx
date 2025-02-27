import { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <div className="from-primary/10 via-primary/5 relative mb-8 bg-gradient-to-r to-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            最新のブログ記事
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            知識を深め、トレンドを学び、インスピレーションを得るための記事コレクション
          </p>
        </div>
      </div>
    </div>
  );
};
