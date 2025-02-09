import { html } from "@/website/app/lib/html";

import { CodeBlock } from "../../components/code-block";
import {
  InstallationBlock,
  InstallationBlockContent,
  InstallationBlockDescription,
  InstallationBlockTitle
} from "./installation-block";

export function InstallationContextCode() {
  return (
    <InstallationBlock>
      <InstallationBlockTitle>Context</InstallationBlockTitle>
      <InstallationBlockContent>
        <InstallationBlockDescription>
          The Autocomplete global state is managed with the React Context api.<br />
          Copy and paste the following code into your project:
        </InstallationBlockDescription>
      </InstallationBlockContent>
      <CodeBlock lang="tsx" code={contextInstallationCode} />
    </InstallationBlock>
  );
}

const contextInstallationCode =
html`  import {
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
    /*
    Async state of the autocomplete. The filter logic is handled by an external source.
    Sets to false to enable the built-in filtering.
    Default: true
    */
    async?: boolean;

    /*
    Default open state of the autocomplete.
    Default: false
    */
    defaultOpen?: boolean;

    /*
    Open state of the autocomplete (controlled).
    Default: undefined
    */
    open?: boolean;

    /*
    Search value of the input (controlled).
    Default: undefined
    */
    searchValue?: string;

    /*
    Loading state of the autocomplete (controlled).
    Default: false
    */
    isLoading?: boolean;

    /*
    Error state of the autocomplete (controlled).
    Default: false
    */
    isError?: boolean;

    /*
    Sets open state of the autocomplete (controlled).
    Default: undefined
    */
    onOpenChange?: (open: boolean) => void;

    /*
    Sets search value of the autocomplete.
    Default: undefined
    */
    onSearchChange?: (search: string) => void;

    /*
    Sets selected value of the autocomplete.
    Default: undefined
    */
    onSelectChange?: (value: string | null) => void;
  };

  type AutocompleteItemShape = {
    label: string;
    value: string;
  };

  type AutocompleteContextValue = {
    async: boolean;
    isOpen: boolean;
    isLoading: boolean;
    isEmpty: boolean;
    isError: boolean;
    results: Array<AutocompleteItemShape>;
    searchValue: string;
    selectedValue: string | null;
    canSelect: (value?: string) => boolean;
    clearStates: () => void;
    handleSearch: (value: string) => void;
    handleSelect: (value: string | null) => void;
    setIsOpen: (open: boolean) => void;
    setResults: (results: Array<AutocompleteItemShape>) => void;
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
      [_setOpen, params],
    );

    return [isOpen, setIsOpen] as const;
  }

  function useSearchValue(
    params: Pick<
      AutocompleteContextValue,
      "isOpen" | "setIsOpen" | "results" | "setResults"
    > &
      Pick<AutocompleteProviderProps, "searchValue" | "onSearchChange">,
  ) {
    const [_searchValue, _setSearchValue] = useState<string>("");
    const deferredValue = useDeferredValue(params.searchValue ?? _searchValue);

    const handleSearchChange = useCallback(
      (value: string) => {
        if (!value.length && params.results.length) {
          params.setResults([]);
        }

        if (!params.isOpen && value.length) {
          params.setIsOpen(true);
        } else if (params.isOpen && !value.length) {
          params.setIsOpen(false);
        }

        if (params.onSearchChange) {
          params.onSearchChange(value);
        } else {
          _setSearchValue(value);
        }
      },
      [params, _setSearchValue],
    );

    return [deferredValue, _setSearchValue, handleSearchChange] as const;
  }

  function useSelectedValue(
    params: Pick<AutocompleteContextValue, "results" | "setResults"> & {
      onSelectChange?: (value: string | null) => void;
    },
  ) {
    const { results, setResults, onSelectChange } = params;
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleSelect = useCallback(
      (value: string | null) => {
        const item = results.find((item) => item.value === value);
        if (!item) return;

        setSelectedValue(value);
        setResults([item]);
        onSelectChange?.(value);
      },
      [results, setResults, onSelectChange, setSelectedValue],
    );

    const canSelect = useCallback(
      (value?: string) => results.some((item) => item.value === value),
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
      "isLoading" | "results" | "searchValue"
    >,
  ): boolean {
    const { isLoading, results, searchValue } = params;

    const isEmpty = useMemo<boolean>(() => {
      if (isLoading) {
        return false;
      }
      return searchValue.length > 0 && results.length === 0;
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

  function AutocompleteProvider(
    props: PropsWithChildren<AutocompleteProviderProps>,
  ) {
    const {
      async = true,
      children,
      open,
      defaultOpen = false,
      searchValue: searchValueProp,
      isLoading = false,
      isError = false,
      onOpenChange,
      onSearchChange,
      onSelectChange,
    } = props;

    const [results, setResults] = useState<Array<AutocompleteItemShape>>([]);

    const [isOpen, setIsOpen] = useIsOpen({ open, defaultOpen, onOpenChange });

    const [searchValue, setSearchValue, handleSearch] = useSearchValue({
      searchValue: searchValueProp,
      isOpen,
      setIsOpen,
      results,
      setResults,
      onSearchChange,
      // onSearchChange: (value) => {
      //   if (selectedValue) {
      //     setSelectedValue(null);
      //   }
      //   onSearchChange?.(value);
      // },
    });

    const { selectedValue, setSelectedValue, handleSelect, canSelect } =
      useSelectedValue({
        results,
        setResults,
        onSelectChange: (value) => {
          setIsOpen(false);
          setSearchValue("");
          onSearchChange?.("");
          onSelectChange?.(value);
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
        setResults,
        setIsOpen,
        canSelect,
        clearStates: () => {
          setIsOpen(false);
          setSelectedValue(null);
          setSearchValue("");
          setResults([]);
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
      setIsOpen,
      setSelectedValue,
      setSearchValue,
      setResults,
    ]);

    return (
      <AutocompleteContext.Provider value={contextValue}>
        {children}
      </AutocompleteContext.Provider>
    );
  }

  export {
    type AutocompleteItemShape,
    type AutocompleteContextValue,
    type AutocompleteProviderProps,
    AutocompleteProvider,
    useAutocomplete,
  };`;
