import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const THEME_KEY = "--theme";
const OUTPUT_KEY = "--show-output";

type Theme = "dark" | "light" | "system";

type SettingsContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  showOutput: boolean;
  setShowOutput: (showOutput: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};

const SettingsProvider = ({
  children,
  defaultTheme = "system",
  defaultShowOutput = true,
  storageKey = "shadcn-autocomplete-settings",
  ...props
}: {
  children: ReactNode;
  defaultTheme?: Theme;
  defaultShowOutput?: boolean;
  storageKey?: string;
}) => {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(`${storageKey}${THEME_KEY}`) as Theme) ||
      defaultTheme,
  );

  const getInitialShowOutput = () => {
    const savedShowOutput = localStorage.getItem(`${storageKey}${OUTPUT_KEY}`);

    if (savedShowOutput === "false") {
      return false;
    }
    if (savedShowOutput === "true") {
      return true;
    }

    return defaultShowOutput;
  };

  const [showOutput, setShowOutput] = useState<boolean>(getInitialShowOutput);

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
        localStorage.setItem(`${storageKey}${THEME_KEY}`, theme);
        setTheme(theme);
      },
      showOutput,
      setShowOutput: (showOutput: boolean) => {
        localStorage.setItem(
          `${storageKey}${OUTPUT_KEY}`,
          showOutput.toString(),
        );
        setShowOutput(showOutput);
      },
    };
  }, [storageKey, theme, showOutput, setTheme, setShowOutput]);

  return (
    <SettingsContext.Provider {...props} value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettings, type Theme };
