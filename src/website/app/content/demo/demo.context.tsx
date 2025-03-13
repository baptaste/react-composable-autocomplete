import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AutocompleteItemShape } from "@/packages/core/autocomplete/autocomplete.context";

import {
  PLAYGROUND_ASYNC_MODE_KEY,
  PLAYGROUND_EMPTY_KEY,
  PLAYGROUND_ERROR_KEY,
  PLAYGROUND_LABEL_KEY,
  PLAYGROUND_LOADING_KEY,
  PLAYGROUND_OUTPUT_KEY,
  STORAGE_ROOT_KEY,
} from "../../lib/constants";
import { usersMock } from "../../lib/mocks";
import { fetchTmdbMovies } from "../../lib/tmdb-api";

type PlaygroundOption =
  | typeof PLAYGROUND_OUTPUT_KEY
  | typeof PLAYGROUND_ASYNC_MODE_KEY
  | typeof PLAYGROUND_ERROR_KEY
  | typeof PLAYGROUND_LOADING_KEY
  | typeof PLAYGROUND_EMPTY_KEY
  | typeof PLAYGROUND_LABEL_KEY;

type DemoContextValue = {
  data: Array<AutocompleteItemShape>;
  isLoading: boolean;
  isError: boolean;
  setData: (data: Array<AutocompleteItemShape>) => void;
  handleSearch: (search: string) => void;
  handleSelect: (value: string | null) => void;
  handleClear: () => void;

  playground: Record<PlaygroundOption, boolean | undefined>;
  updatePlayground: (option: PlaygroundOption, value: boolean) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

function useDemo() {
  const context = useContext(DemoContext);

  if (context === null) {
    throw new Error("useDemo must be used within a DemoProvider");
  }

  return context;
}

function getStoragePlaygroundOutputValue(): boolean {
  const value = localStorage.getItem(
    `${STORAGE_ROOT_KEY}${PLAYGROUND_OUTPUT_KEY}`,
  );

  if (value === null) {
    return false;
  }

  return value === "true";
}

function DemoProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Array<AutocompleteItemShape>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [showOutput, setShowOutput] = useState(getStoragePlaygroundOutputValue);
  const [showLabel, setShowLabel] = useState(false);
  const [asyncMode, setAsyncMode] = useState(true);

  const handleSearch = useCallback(
    async (search: string) => {
      if (!asyncMode) return;

      if (!search.length) return void setData([]);

      try {
        setIsLoading(true);
        const data = await fetchTmdbMovies(search);
        setData(data);
      } catch (error: unknown) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [asyncMode],
  );

  const handleSelect = useCallback(
    (value: string | null) => {
      const item = data.find(
        (item) => item.value === value || item.label === value,
      );

      if (item) {
        setData([item]);
      }
    },
    [data],
  );

  const playground: DemoContextValue["playground"] = useMemo(() => {
    return asyncMode
      ? {
          output: showOutput,
          async: true,
          label: showLabel,
          empty: isEmpty,
          error: isError,
          loading: isLoading,
        }
      : {
          output: showOutput,
          async: false,
          label: showLabel,
          empty: isEmpty,
          error: undefined,
          loading: undefined,
        };
  }, [asyncMode, showOutput, showLabel, isEmpty, isError, isLoading]);

  const updatePlayground = useCallback(
    (option: PlaygroundOption, active: boolean) => {
      switch (option) {
        case "output": {
          localStorage.setItem(
            `${STORAGE_ROOT_KEY}${PLAYGROUND_OUTPUT_KEY}`,
            active.toString(),
          );
          setShowOutput(active);
          break;
        }
        case "async": {
          if (!active) {
            setAsyncMode(false);
            // setData(usersMock);
            // if (!data.length) setData(usersMock);
            if (isError) setIsError(false);
            if (isLoading) setIsLoading(false);
            break;
          }
          setAsyncMode(true);
          setData([]);
          break;
        }
        case "error": {
          setIsError(active);
          if (isLoading) setIsLoading(false);
          if (isEmpty) setIsEmpty(false);
          break;
        }
        case "loading": {
          setIsLoading(active);
          if (isError) setIsError(false);
          if (isEmpty) setIsEmpty(false);
          break;
        }
        case "empty": {
          setIsEmpty(active);
          // if (active) {
          //   setData([]);
          // } else {
          //   if (!asyncMode) {
          //     setData(usersMock);
          //   }
          // }
          if (isError) setIsError(false);
          if (isLoading) setIsLoading(false);
          break;
        }
        case "label": {
          setShowLabel(active);
          break;
        }
      }
    },
    [isError, isLoading, isEmpty],
  );

  const contextValue = useMemo<DemoContextValue>(
    () => ({
      data,
      isLoading,
      isError,
      isEmpty,
      playground,
      setData,
      setAsyncMode,
      handleSearch,
      handleSelect,
      handleClear: () => {
        setIsError(false);
        setIsEmpty(false);
        setIsLoading(false);
        setData(asyncMode ? [] : usersMock);
      },
      updatePlayground,
    }),
    [
      asyncMode,
      data,
      isLoading,
      isError,
      isEmpty,
      playground,
      setData,
      setAsyncMode,
      handleSearch,
      handleSelect,
      updatePlayground,
    ],
  );

  // console.log("demo contextValue", contextValue);

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
}

export { DemoProvider, useDemo, type PlaygroundOption };
