"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  variant?: "header" | "menu";
};

export function ThemeToggle({ variant = "header" }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const className = cn(
    "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
    variant === "header"
      ? "border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:scale-105"
      : "border border-border bg-card text-foreground hover:bg-accent hover:scale-105"
  );

  if (!mounted) {
    return <button className={className} aria-label="Toggle theme" />;
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
