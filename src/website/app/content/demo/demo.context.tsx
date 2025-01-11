import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { AutocompleteItemShape } from "@/packages/core/autocomplete/autocomplete.context";

type DemoContextValue = {
  data: Array<AutocompleteItemShape>;
  isLoading: boolean;
  isError: boolean;
  setData: (data: Array<AutocompleteItemShape>) => void;
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

  const contextValue = useMemo<DemoContextValue>(
    () => ({
      data,
      isLoading,
      isError,
      setData,
      handleSearch,
      handleSelect,
      handleClear: () => {
        setIsError(false);
        setData([]);
      },
    }),
    [data, isLoading, isError, setData, handleSearch, handleSelect],
  );

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
}

export { DemoProvider, useDemo };
