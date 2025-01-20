import { useCallback } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/packages/core/ui/button";

import { useTheme } from "./theme.context";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "dark" ? SunIcon : MoonIcon;
  const nextValue = theme === "dark" ? "light" : "dark";

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <Button
      variant="outline"
      className="fixed right-6 top-4 z-20 py-2 text-xs capitalize sm:right-12 xl:right-40"
      onClick={toggleTheme}
    >
      <Icon className="mr-2 h-4 w-4 text-foreground" />
      {nextValue}
    </Button>
  );
}
