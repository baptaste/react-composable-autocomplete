import {
  createContext,
  useCallback,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

type AutocompleteProviderProps = {
  /**
  Async state of the autocomplete. The filter logic is handled by an external source.
  Sets to false to enable the built-in filtering.
  @default true
  */
  async?: boolean;

  /**
  Default open state of the autocomplete.
  @default false
  */
  defaultOpen?: boolean;

  /**
  Open state of the autocomplete (controlled).
  @default undefined
  */
  open?: boolean;

  /**
  Search value of the input (controlled).
  @default undefined
  */
  searchValue?: string;

  /**
  Loading state of the autocomplete (controlled).
  @default false
  */
  isLoading?: boolean;

  /**
  Error state of the autocomplete (controlled).
  @default false
  */
  isError?: boolean;

  /**
  Sets search value of the autocomplete.
  @default undefined
  */
  onSearch?: (search: string) => void;

  /**
  Sets selected value of the autocomplete.
  @default undefined
  */
  onSelect?: (value: string | null) => void;

  /**
  Event handler for open state change (controlled).
  @default undefined
  */
  onOpenChange?: (open: boolean) => void;

  /**
  Event handler for results change.
  @default undefined
  */
  onResultsChange?: (results: Array<AutocompleteItemShape>) => void;
};

type AutocompleteItemShape = { label: string; value: string };

type AutocompleteResults = Map<string, AutocompleteItemShape>;

type AutocompleteContextValue = {
  async: boolean;
  isOpen: boolean;
  isLoading: boolean;
  isEmpty: boolean;
  isError: boolean;
  results: AutocompleteResults;
  searchValue: string;
  selectedValue: string | null;
  canSelect: (value?: string) => boolean;
  clearStates: () => void;
  handleSearch: (value: string) => void;
  handleSelect: (value: string | null) => void;
  setIsOpen: (open: boolean) => void;
  setResults: (results: AutocompleteResults) => void;
};

const AutocompleteContext = createContext<AutocompleteContextValue | null>(
  null,
);

function useAutocomplete() {
  const context = useContext(AutocompleteContext);

  if (context === null) {
    throw new Error(
      "useAutocomplete must be used within an AutocompleteProvider",
    );
  }

  return context;
}

function useIsOpen(
  params: Pick<
    AutocompleteProviderProps,
    "open" | "defaultOpen" | "onOpenChange"
  >,
) {
  const [_open, _setOpen] = useState(!!params.defaultOpen);

  const isOpen = params.open ?? _open;

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (params.onOpenChange) {
        params.onOpenChange(open);
      } else {
        _setOpen(open);
      }
    },
    [params],
  );

  return [isOpen, setIsOpen] as const;
}

function useSearchValue(
  params: Pick<
    AutocompleteContextValue,
    "isOpen" | "setIsOpen" | "results" | "setResults"
  > &
    Pick<AutocompleteProviderProps, "searchValue" | "onSearch">,
) {
  const [_searchValue, _setSearchValue] = useState<string>("");
  const deferredValue = useDeferredValue(params.searchValue ?? _searchValue);

  const handleSearchChange = useCallback(
    (value: string) => {
      if (!value.length && params.results.size) {
        params.setResults(new Map());
      }
      if (!params.isOpen && value.length) {
        params.setIsOpen(true);
      } else if (params.isOpen && !value.length) {
        params.setIsOpen(false);
      }
      if (params.onSearch) {
        params.onSearch(value);
      } else {
        _setSearchValue(value);
      }
    },
    [params],
  );

  return [deferredValue, _setSearchValue, handleSearchChange] as const;
}

function useSelectedValue(
  params: Pick<AutocompleteContextValue, "results" | "setResults"> & {
    onSelect?: (value: string | null) => void;
  },
) {
  const { results, setResults, onSelect } = params;
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = useCallback(
    (value: string | null) => {
      if (!value || !results.has(value)) return;

      setSelectedValue(value);
      onSelect?.(value);
      const item = results.get(value);
      if (item) {
        setResults(new Map([[value, item]]));
      }
    },
    [results, setResults, onSelect],
  );

  const canSelect = useCallback(
    (value?: string) => !!value && results.has(value),
    [results],
  );

  return {
    selectedValue,
    setSelectedValue,
    handleSelect,
    canSelect,
  };
}

function useIsEmpty(
  params: Pick<
    AutocompleteContextValue,
    "isLoading" | "searchValue" | "results"
  >,
): boolean {
  const { isLoading, results, searchValue } = params;

  const isEmpty = useMemo<boolean>(() => {
    if (isLoading) {
      return false;
    }
    return searchValue.length > 0 && results.size === 0;
  }, [isLoading, searchValue, results]);

  return isEmpty;
}

function useCloseOnKeyDown(
  params: Pick<AutocompleteContextValue, "isOpen" | "setIsOpen">,
): void {
  const { isOpen, setIsOpen } = params;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && ["Enter", "Escape"].includes(e.key)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);
}

function AutocompleteProvider({
  async = true,
  children,
  open,
  defaultOpen = false,
  isError = false,
  isLoading = false,
  searchValue: searchValueProp,
  onSearch,
  onSelect,
  onOpenChange,
  onResultsChange,
}: PropsWithChildren<AutocompleteProviderProps>) {
  const [results, setResults] = useState<AutocompleteResults>(new Map());

  const handleResultsChange = useCallback(
    (results: AutocompleteResults) => {
      setResults(results);
      if (onResultsChange) {
        onResultsChange(Array.from(results).map(([, item]) => item));
      }
    },
    [onResultsChange],
  );

  const [isOpen, setIsOpen] = useIsOpen({ open, defaultOpen, onOpenChange });

  const [searchValue, setSearchValue, handleSearch] = useSearchValue({
    searchValue: searchValueProp,
    onSearch,
    isOpen,
    setIsOpen,
    results,
    setResults,
  });

  const { selectedValue, setSelectedValue, handleSelect, canSelect } =
    useSelectedValue({
      results,
      setResults,
      onSelect: (value) => {
        setIsOpen(false);
        setSearchValue("");
        onSearch?.("");
        onSelect?.(value);
      },
    });

  const isEmpty = useIsEmpty({ isLoading, results, searchValue });

  useCloseOnKeyDown({ isOpen, setIsOpen });

  const contextValue = useMemo<AutocompleteContextValue>(() => {
    return {
      async,
      isOpen,
      isLoading,
      isEmpty,
      isError,
      defaultOpen,
      results,
      searchValue,
      selectedValue,
      handleSearch,
      handleSelect,
      setResults: handleResultsChange,
      setIsOpen,
      canSelect,
      clearStates: () => {
        setIsOpen(false);
        setSelectedValue(null);
        setSearchValue("");
        setResults(new Map());
      },
    };
  }, [
    async,
    isOpen,
    isLoading,
    isEmpty,
    isError,
    defaultOpen,
    results,
    searchValue,
    selectedValue,
    handleSearch,
    handleSelect,
    canSelect,
    handleResultsChange,
  ]);

  return (
    <AutocompleteContext.Provider value={contextValue}>
      {children}
    </AutocompleteContext.Provider>
  );
}

export type {
  AutocompleteItemShape,
  AutocompleteResults,
  AutocompleteContextValue,
  AutocompleteProviderProps,
};

export { AutocompleteProvider, useAutocomplete };
