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
  setData: (data: Array<AutocompleteItemShape>) => void;
  setIsLoading: (isLoading: boolean) => void;
  handleSearch: (search: string) => void;
  handleSelect: (value: string) => void;
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

  const handleSearch = useCallback(
    async (search: string) => {
      if (!search.length) {
        setData([]);
        return;
      }
      setIsLoading(true);
      const data = await fetchDataFn(search);
      setData(data);
      setIsLoading(false);
    },
    [fetchDataFn],
  );

  const handleSelect = useCallback(
    (value: string) => {
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
      setData,
      setIsLoading,
      handleSearch,
      handleSelect,
      handleClear: () => {
        setData([]);
      },
    }),
    [data, isLoading, setData, setIsLoading, handleSearch, handleSelect],
  );

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
}

export { DemoProvider, useDemo };
