import { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <div
      className="from-primary/10 via-primary/5 relative mb-8 bg-gradient-to-r to-background px-4 py-16 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/main-visual.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            最新のブログ記事
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-200 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            あなたの興味に合ったサービスを見つけましょう
          </p>
        </div>
      </div>
    </div>
  );
};
