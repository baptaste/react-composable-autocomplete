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

  type AutocompleteItemShape = {
    label: string;
    value: string;
  };

  type AutocompleteContextValue = {
    isOpen: boolean;
    isLoading: boolean;
    isEmpty: boolean;
    isError: boolean;
    results: Array<AutocompleteItemShape>;
    searchValue: string;
    selectedValue: string | null;

    handleSearch: (value: string) => void;
    handleSelect: (value: string | null) => void;
    clearStates: () => void;

    setIsOpen?: (open: boolean) => void;
    setResults?: (results: Array<AutocompleteItemShape>) => void;
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

    useEffect(() => {
      if (params.defaultOpen) {
        setOpen(params.defaultOpen);
      }
    }, [params.defaultOpen]);

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
    > &
      Pick<AutocompleteProviderProps, "defaultValue" | "onSearchChange">,
  ) {
    const [searchValue, setSearchValue] = useState<string>(
      params.defaultValue ?? "",
    );
    const deferredValue = useDeferredValue(searchValue);

    useEffect(() => {
      if (params.defaultValue) {
        setSearchValue(params.defaultValue);
      }
    }, [params.defaultValue]);

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
    open?: boolean;
    defaultOpen?: boolean;
    defaultValue?: string;
    isLoading?: boolean;
    isError?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSearchChange?: (search: string) => void;
    onSelectChange?: (value: string | null) => void;
  }>;

  function AutocompleteProvider({
    children,
    open,
    defaultOpen,
    defaultValue,
    isLoading = false,
    isError = false,
    onOpenChange,
    onSearchChange,
    onSelectChange,
  }: AutocompleteProviderProps) {
    const [results, setResults] = useState<Array<AutocompleteItemShape>>([]);
    const [isOpen, setIsOpen] = useIsOpen({ open, defaultOpen, onOpenChange });
    const [searchValue, setSearchValue, handleSearch] = useSearchValue({
      defaultValue,
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
    const isEmpty = useIsEmpty({ isLoading, results, searchValue });

    useCloseOnKeyDown({ isOpen, setIsOpen });

    const contextValue = useMemo<AutocompleteContextValue>(() => {
      return {
        isOpen,
        results,
        searchValue,
        selectedValue,
        isLoading,
        isEmpty,
        isError,
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
      isError,
      handleSearch,
      handleSelect,
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
