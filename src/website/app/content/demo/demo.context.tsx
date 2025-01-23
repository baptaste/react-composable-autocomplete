import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { AutocompleteItemShape } from "@/packages/core/autocomplete/autocomplete.context";

import {
  PLAYGROUND_ASYNC_MODE_KEY,
  PLAYGROUND_EMPTY_KEY,
  PLAYGROUND_ERROR_KEY,
  PLAYGROUND_LOADING_KEY,
  PLAYGROUND_OUTPUT_KEY,
  STORAGE_ROOT_KEY,
} from "../../lib/constants";
import { usersMock } from "../../lib/mocks";

type PlaygroundOption =
  | typeof PLAYGROUND_OUTPUT_KEY
  | typeof PLAYGROUND_ASYNC_MODE_KEY
  | typeof PLAYGROUND_ERROR_KEY
  | typeof PLAYGROUND_LOADING_KEY
  | typeof PLAYGROUND_EMPTY_KEY;

type DemoContextValue = {
  asyncMode: boolean; // playground only
  data: Array<AutocompleteItemShape>;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean; // playground only
  showOutput: boolean; // playground only
  setData: (data: Array<AutocompleteItemShape>) => void;
  updatePlayground: (option: PlaygroundOption, value: boolean) => void; // playground only
  handleSearch: (search: string) => void;
  handleSelect: (value: string | null) => void;
  handleClear: () => void;
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

function DemoProvider({
  children,
  fetchDataFn,
}: {
  children: React.ReactNode;
  fetchDataFn?: (search: string) => Promise<Array<AutocompleteItemShape>>;
}) {
  const [data, setData] = useState<Array<AutocompleteItemShape>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showOutput, setShowOutput] = useState(getStoragePlaygroundOutputValue);
  const [asyncMode, setAsyncMode] = useState(true);

  const handleSearch = useCallback(
    async (search: string) => {
      if (!asyncMode) {
        if (!search.length) {
          return void setData(usersMock);
        }
        return void setData(
          data.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase()),
          ),
        );
      }

      if (!search.length) {
        return void setData([]);
      }

      try {
        setIsLoading(true);
        const data = await fetchDataFn?.(search);
        setData(data ?? []);
      } catch (error: unknown) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [asyncMode, data, fetchDataFn],
  );

  const handleSelect = useCallback(
    (value: string | null) => {
      const item = data.find(
        (item) => item.value.toString() === value || item.label === value,
      );

      if (item) {
        setData([item]);
      }
    },
    [data],
  );

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
            setData(usersMock);
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
          if (active) {
            setData([]);
          } else {
            if (!asyncMode) {
              setData(usersMock);
            }
          }
          if (isError) setIsError(false);
          if (isLoading) setIsLoading(false);
          break;
        }
      }
    },
    [isLoading, isError, isEmpty, asyncMode],
  );

  const contextValue = useMemo<DemoContextValue>(
    () => ({
      data,
      isLoading,
      isError,
      isEmpty,
      asyncMode,
      showOutput,
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
      data,
      isLoading,
      isError,
      isEmpty,
      asyncMode,
      showOutput,
      setData,
      setAsyncMode,
      handleSearch,
      handleSelect,
      updatePlayground,
    ],
  );

  console.log("Demo context", { contextValue });

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
}

export { DemoProvider, useDemo, type PlaygroundOption };
