import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { AutocompleteOption } from "./autocomplete";

type AutocompleteContextValue = {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  focused: boolean;
  setFocused: (focused: boolean) => void;
  isLoading: boolean;
  isEmpty: boolean;
  items: AutocompleteOption[];
  setItems: (items: AutocompleteOption[]) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
  clearStates: () => void;
};

const AutocompleteContext = createContext<AutocompleteContextValue | null>(
  null,
);

const useAutocomplete = () => {
  const context = useContext(AutocompleteContext);

  if (!context) {
    throw new Error(
      "useAutocomplete must be used within an AutocompleteProvider",
    );
  }

  return context;
};

type AutocompleteProviderProps = PropsWithChildren<{
  defaultOpen?: boolean;
  open?: boolean;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

const AutocompleteProvider = ({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange: setOpenProp,
  isLoading = false,
}: AutocompleteProviderProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [focused, setFocused] = useState(false);
  const [items, setItems] = useState<AutocompleteOption[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const open = openProp ?? internalOpen;
  const setOpen = useCallback(
    (open: boolean) => {
      setInternalOpen(open);
      setOpenProp?.(open);
    },
    [setOpenProp],
  );

  const isEmpty =
    !isLoading && open && searchValue.length > 0 && items.length === 0;

  const clearStates = useCallback(() => {
    setOpen(false);
    setOpenProp?.(false);
    setSelectedValue(null);
    setSearchValue("");
    setItems([]);
  }, [setOpen, setOpenProp]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["Enter", "Escape"].includes(e.key) && open) {
        setOpen(false);
      }

      if (["Enter", "Escape"].includes(e.key) && focused) {
        setFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, focused, setOpen, setFocused]);

  useEffect(() => {
    const handleOuterClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.closest("[data-autocomplete]") &&
        !e.target.closest("[data-autocomplete-input]") &&
        !e.target.closest("[data-autocomplete-item]")
      ) {
        if (open) {
          setOpen(false);
        }

        if (focused) {
          setFocused(false);
        }
      }
    };

    window.addEventListener("click", handleOuterClick);

    return () => {
      window.removeEventListener("click", handleOuterClick);
    };
  }, [open, focused, setOpen, setFocused]);

  const value = useMemo(() => {
    return {
      defaultOpen,
      open,
      setOpen,
      onOpenChange: setOpenProp,
      searchValue,
      setSearchValue,
      selectedValue,
      setSelectedValue,
      items,
      setItems,
      isLoading,
      isEmpty,
      clearStates,
      focused,
      setFocused,
    };
  }, [
    open,
    setOpen,
    items,
    setItems,
    searchValue,
    setSearchValue,
    selectedValue,
    setSelectedValue,
    defaultOpen,
    setOpenProp,
    isLoading,
    isEmpty,
    clearStates,
    focused,
    setFocused,
  ]);

  console.log("Context", {
    open,
    defaultOpen,
    searchValue,
    selectedValue,
    items,
    isLoading,
    isEmpty,
    focused,
  });

  return (
    <AutocompleteContext.Provider value={value}>
      {children}
    </AutocompleteContext.Provider>
  );
};

export { AutocompleteProvider, useAutocomplete };
