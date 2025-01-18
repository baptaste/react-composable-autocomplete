import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  PLAYGROUND_EMPTY_KEY,
  PLAYGROUND_ERROR_KEY,
  PLAYGROUND_LOADING_KEY,
  PLAYGROUND_OUTPUT_KEY,
  STORAGE_ROOT_KEY,
  THEME_KEY,
} from "../../lib/constants";

type Theme = "dark" | "light" | "system";

type PlaygroundKey =
  | typeof PLAYGROUND_OUTPUT_KEY
  | typeof PLAYGROUND_ERROR_KEY
  | typeof PLAYGROUND_LOADING_KEY
  | typeof PLAYGROUND_EMPTY_KEY;

type Playground = { [K in PlaygroundKey]: boolean };

type SettingsContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  playground: Playground;
  setPlayground: (key: PlaygroundKey, value: boolean) => void;
  resetPlayground: () => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

function useSettings() {
  const context = useContext(SettingsContext);

  if (context === null) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}

function getStoragePlaygroundOutputValue(): boolean {
  const value = localStorage.getItem(
    `${STORAGE_ROOT_KEY}${PLAYGROUND_OUTPUT_KEY}`,
  );

  if (value === null) {
    return true;
  }

  return value === "true";
}

const initialPlayground: Playground = {
  output: getStoragePlaygroundOutputValue(),
  error: false,
  loading: false,
  empty: false,
};

function SettingsProvider({ children, ...props }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(`${STORAGE_ROOT_KEY}${THEME_KEY}`) as Theme) ||
      "system",
  );

  const [playground, setPlayground] = useState<Playground>(initialPlayground);

  const resetPlayground = useCallback(() => {
    setPlayground(initialPlayground);
  }, []);

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
        localStorage.setItem(`${STORAGE_ROOT_KEY}${THEME_KEY}`, theme);
        setTheme(theme);
      },
      playground,
      setPlayground: (key: PlaygroundKey, value: boolean) => {
        switch (key) {
          case "output": {
            localStorage.setItem(
              `${STORAGE_ROOT_KEY}${PLAYGROUND_OUTPUT_KEY}`,
              value.toString(),
            );
            setPlayground((prev) => ({ ...prev, output: value }));
            break;
          }
          case "error":
            setPlayground((prev) => ({
              ...prev,
              error: value,
              loading: false,
              empty: false,
            }));
            break;
          case "loading":
            setPlayground((prev) => ({
              ...prev,
              loading: value,
              error: false,
              empty: false,
            }));
            break;
          case "empty":
            setPlayground((prev) => ({
              ...prev,
              empty: value,
              loading: false,
              error: false,
            }));
            break;
        }
      },
      resetPlayground,
    };
  }, [theme, setTheme, playground, setPlayground, resetPlayground]);

  return (
    <SettingsContext.Provider {...props} value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, useSettings, type Theme, type PlaygroundKey };
