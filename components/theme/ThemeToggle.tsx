"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const {
    theme,
    setTheme,
    resolvedTheme,
  } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-11 w-11 rounded-full border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/[0.04]" />
    );
  }

  const isDark =
    (theme === "system"
      ? resolvedTheme
      : theme) === "dark";

  return (
    <motion.button
      type="button"
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      whileHover={{
        rotate: isDark ? -10 : 10,
        scale: 1.06,
      }}
      whileTap={{
        scale: 0.92,
      }}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-cyan-400/30 dark:hover:text-cyan-300"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </motion.button>
  );
}