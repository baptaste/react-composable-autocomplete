import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { AutocompleteItemShape } from "@/packages/core/autocomplete/autocomplete.context";

import {
  PLAYGROUND_EMPTY_KEY,
  PLAYGROUND_ERROR_KEY,
  PLAYGROUND_LOADING_KEY,
  PLAYGROUND_OUTPUT_KEY,
  STORAGE_ROOT_KEY,
} from "../../lib/constants";

type PlaygroundOption =
  | typeof PLAYGROUND_OUTPUT_KEY
  | typeof PLAYGROUND_ERROR_KEY
  | typeof PLAYGROUND_LOADING_KEY
  | typeof PLAYGROUND_EMPTY_KEY;

type DemoContextValue = {
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
    return true;
  }

  return value === "true";
}

function DemoProvider({
  children,
  fetchDataFn,
}: {
  children: React.ReactNode;
  fetchDataFn: (search: string) => Promise<Array<AutocompleteItemShape>>;
}) {
  const [data, setData] = useState<Array<AutocompleteItemShape>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showOutput, setShowOutput] = useState(getStoragePlaygroundOutputValue);

  const handleSearch = useCallback(
    async (search: string) => {
      if (!search.length) {
        setData([]);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchDataFn(search);
        setData(data);
      } catch (error: unknown) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchDataFn],
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
    (option: PlaygroundOption, value: boolean) => {
      switch (option) {
        case "output": {
          localStorage.setItem(
            `${STORAGE_ROOT_KEY}${PLAYGROUND_OUTPUT_KEY}`,
            value.toString(),
          );
          setShowOutput(value);
          break;
        }
        case "error": {
          setIsError(value);
          if (isLoading) setIsLoading(false);
          if (isEmpty) setIsEmpty(false);
          break;
        }
        case "loading": {
          setIsLoading(value);
          if (isError) setIsError(false);
          if (isEmpty) setIsEmpty(false);
          break;
        }
        case "empty": {
          setIsEmpty(value);
          if (isError) setIsError(false);
          if (isLoading) setIsLoading(false);
          break;
        }
      }
    },
    [isLoading, isError, isEmpty],
  );

  const contextValue = useMemo<DemoContextValue>(
    () => ({
      data,
      isLoading,
      isError,
      isEmpty,
      showOutput,
      setData,
      handleSearch,
      handleSelect,
      handleClear: () => {
        setIsError(false);
        setIsEmpty(false);
        setIsLoading(false);
        setData([]);
      },
      updatePlayground,
    }),
    [
      data,
      isLoading,
      isError,
      isEmpty,
      showOutput,
      setData,
      handleSearch,
      handleSelect,
      updatePlayground,
    ],
  );

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
}

export { DemoProvider, useDemo, type PlaygroundOption };
