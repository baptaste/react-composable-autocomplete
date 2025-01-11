import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  STORAGE_PLAYGROUND_ERROR_KEY,
  STORAGE_PLAYGROUND_LOADING_KEY,
  STORAGE_PLAYGROUND_OUTPUT_KEY,
  STORAGE_ROOT_KEY,
  STORAGE_THEME_KEY,
} from "../../lib/constants";

type Theme = "dark" | "light" | "system";

type PlaygroundKey =
  | typeof STORAGE_PLAYGROUND_OUTPUT_KEY
  | typeof STORAGE_PLAYGROUND_ERROR_KEY
  | typeof STORAGE_PLAYGROUND_LOADING_KEY;

type SettingsContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  playground: {
    [K in PlaygroundKey]: boolean;
  };
  setPlayground: (key: PlaygroundKey, value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

function useSettings() {
  const context = useContext(SettingsContext);

  if (context === null) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}

function getStoragePlaygroundValue(
  key: PlaygroundKey,
  defaultValue = false,
): boolean {
  const value = localStorage.getItem(`${STORAGE_ROOT_KEY}${key}`);

  if (value === null) {
    return defaultValue;
  }

  return value === "true";
}

function setStoragePlaygroundValue(key: PlaygroundKey, value: boolean): void {
  localStorage.setItem(`${STORAGE_ROOT_KEY}${key}`, value.toString());
}

function SettingsProvider({ children, ...props }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(
        `${STORAGE_ROOT_KEY}${STORAGE_THEME_KEY}`,
      ) as Theme) || "system",
  );

  const [playground, setPlayground] = useState({
    output: getStoragePlaygroundValue(STORAGE_PLAYGROUND_OUTPUT_KEY, true),
    error: getStoragePlaygroundValue(STORAGE_PLAYGROUND_ERROR_KEY),
    loading: getStoragePlaygroundValue(STORAGE_PLAYGROUND_LOADING_KEY),
  });

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

  const contextValue = useMemo(() => {
    return {
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(`${STORAGE_ROOT_KEY}${STORAGE_THEME_KEY}`, theme);
        setTheme(theme);
      },
      playground,
      setPlayground: (key: PlaygroundKey, value: boolean) => {
        setStoragePlaygroundValue(key, value);
        setPlayground((prev) => ({ ...prev, [key]: value }));
      },
    };
  }, [theme, setTheme, playground, setPlayground]);

  console.log("Settings context", { contextValue });

  return (
    <SettingsContext.Provider {...props} value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, useSettings, type Theme, type PlaygroundKey };
