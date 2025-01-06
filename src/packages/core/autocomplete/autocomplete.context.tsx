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

type AutocompleteOption = {
  label: string;
  value: string;
};

type AutocompleteContextValue = {
  isOpen: boolean;
  isLoading: boolean;
  isEmpty: boolean;
  results: Array<AutocompleteOption>;
  searchValue: string;
  selectedValue: string | null;

  handleSearch: (value: string) => void;
  handleSelect: (value: string | null) => void;
  clearStates: () => void;

  setIsOpen?: (open: boolean) => void;
  setResults?: (results: Array<AutocompleteOption>) => void;
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
  const [open, setOpen] = useState(params.defaultOpen ?? false);

  const isOpen = params.open ?? open;

  const setIsOpen = useCallback(
    (open: boolean) => {
      setOpen(open);
      params.onOpenChange?.(open);
    },
    [setOpen, params],
  );

  return [isOpen, setIsOpen] as const;
}

function useSearchValue(
  params: Pick<
    AutocompleteContextValue,
    "isOpen" | "setIsOpen" | "results" | "setResults"
  > & {
    onSearchChange?: (search: string) => void;
  },
) {
  const [searchValue, setSearchValue] = useState<string>("");
  const deferredValue = useDeferredValue(searchValue);

  const handleSearchChange = useCallback(
    (value: string) => {
      if (!value.length && params.results.length) {
        params.setResults?.([]);
      }

      if (!params.isOpen && value.length) {
        params.setIsOpen?.(true);
      } else if (params.isOpen && !value.length) {
        params.setIsOpen?.(false);
      }

      setSearchValue(value);
      params.onSearchChange?.(value);
    },
    [params, setSearchValue],
  );

  return [deferredValue, setSearchValue, handleSearchChange] as const;
}

function useSelectedValue(
  params: Pick<AutocompleteContextValue, "results" | "setResults"> & {
    onSelectChange?: (value: string | null) => void;
  },
) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelectChange = useCallback(
    (value: string | null) => {
      const item = params.results.find((item) => item.value === value);

      if (!item) {
        return;
      }

      setSelectedValue(value);
      params.setResults?.([item]);
      params.onSelectChange?.(value);
    },
    [params, setSelectedValue],
  );

  return [selectedValue, setSelectedValue, handleSelectChange] as const;
}

function useHandleKeyDown(
  params: Pick<AutocompleteContextValue, "isOpen" | "setIsOpen">,
): void {
  const { isOpen, setIsOpen } = params;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && ["Enter", "Escape"].includes(e.key)) {
        setIsOpen?.(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);
}

type AutocompleteProviderProps = PropsWithChildren<{
  defaultOpen?: boolean;
  open?: boolean;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSearchChange?: (search: string) => void;
  onSelectChange?: (value: string | null) => void;
}>;

function AutocompleteProvider({
  children,
  open,
  defaultOpen,
  isLoading = false,
  onOpenChange,
  onSearchChange,
  onSelectChange,
}: AutocompleteProviderProps) {
  const [isOpen, setIsOpen] = useIsOpen({ open, defaultOpen, onOpenChange });
  const [results, setResults] = useState<Array<AutocompleteOption>>([]);

  const [searchValue, setSearchValue, handleSearch] = useSearchValue({
    isOpen,
    setIsOpen,
    results,
    setResults,
    onSearchChange: (value) => {
      if (selectedValue) {
        setSelectedValue(null);
      }
      onSearchChange?.(value);
    },
  });

  const [selectedValue, setSelectedValue, handleSelect] = useSelectedValue({
    results,
    setResults,
    onSelectChange: (value) => {
      setIsOpen(false);
      setSearchValue("");
      onSelectChange?.(value);
    },
  });

  useHandleKeyDown({ isOpen, setIsOpen });

  const isEmpty = useMemo(
    () => !isLoading && isOpen && searchValue.length > 0 && !results.length,
    [isLoading, isOpen, searchValue, results],
  );

  const context = useMemo<AutocompleteContextValue>(() => {
    return {
      isOpen,
      results,
      searchValue,
      selectedValue,
      isLoading,
      isEmpty,
      handleSearch,
      handleSelect,
      setResults,
      setIsOpen,
      clearStates: () => {
        setIsOpen(false);
        setSelectedValue(null);
        setSearchValue("");
        setResults([]);
      },
    };
  }, [
    isOpen,
    results,
    searchValue,
    selectedValue,
    isLoading,
    isEmpty,
    handleSearch,
    handleSelect,
    setIsOpen,
    setSelectedValue,
    setSearchValue,
    setResults,
  ]);

  return (
    <AutocompleteContext.Provider value={context}>
      {children}
    </AutocompleteContext.Provider>
  );
}

export {
  type AutocompleteOption,
  type AutocompleteContextValue,
  type AutocompleteProviderProps,
  AutocompleteProvider,
  useAutocomplete,
};
