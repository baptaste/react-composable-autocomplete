import { useCallback } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/packages/core/ui/button";

import { useTheme, type Theme } from "./theme.context";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  let NextIcon = theme === "dark" ? SunIcon : MoonIcon;
  let nextTheme: Theme = theme === "dark" ? "light" : "dark";

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    NextIcon = systemTheme === "dark" ? SunIcon : MoonIcon;
    nextTheme = systemTheme === "dark" ? "light" : "dark";
  }

  const toggleTheme = useCallback(() => {
    setTheme(nextTheme);
  }, [nextTheme, setTheme]);

  return (
    <Button
      variant="outline"
      className="group fixed right-6 top-4 z-20 h-7 px-3 text-xs capitalize sm:right-12 xl:right-40"
      onClick={toggleTheme}
    >
      <NextIcon className="mr-2 h-4 w-4 text-foreground/60 transition-colors duration-300 group-hover:text-foreground" />
      {nextTheme}
    </Button>
  );
}
