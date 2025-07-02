"use client";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("theme", theme);  
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <button
        aria-label="Toggle Theme"
        className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        type="button"
      >
        {theme === "dark" ? (
          <SunIcon className="w-6 h-6 text-yellow-400" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-800" />
        )}
      </button>
    </div>
  );
} 