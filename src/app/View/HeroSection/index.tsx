import { FC } from "react";
import { motion } from "framer-motion";

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
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            転職、副業を探す
          </motion.h1>
          <motion.p
            className="mx-auto mt-3 max-w-md text-base text-gray-200 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            あなたの興味に合ったサービスを見つけましょう
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
