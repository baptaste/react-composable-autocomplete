import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { STORAGE_ROOT_KEY, THEME_KEY } from "../../lib/constants";

type Theme = "dark" | "light" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

function ThemeProvider({ children, ...props }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(`${STORAGE_ROOT_KEY}${THEME_KEY}`) as Theme) ||
      "system",
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const contextValue = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(`${STORAGE_ROOT_KEY}${THEME_KEY}`, theme);
        setTheme(theme);
      },
    };
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider {...props} value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, useTheme, type Theme };
