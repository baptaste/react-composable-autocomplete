# Shadcn Basic Autocomplete

A basic React/tailwind autocomplete component built with [shadcn/ui](https://ui.shadcn.com/) and [cmdk's Command](https://cmdk.paco.me/).

## Example usage

```tsx
<Autocomplete isLoading={isLoading}>
  <AutocompleteContent>
    <AutocompleteInput onSearchChange={handleSearch}>
      <AutocompleteClear onClear={handleClear} />
    </AutocompleteInput>
    <AutocompleteList>
      {data.map((item) => (
        <AutocompleteItem
          key={item.value}
          value={item.value}
          onSelectChange={handleSelect}
        >
          {item.label}
        </AutocompleteItem>
      ))}
      <AutocompleteLoading />
      <AutocompleteEmpty />
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>
```

## Installation

### Prerequisite

The following steps assumes that your project already has the base tools/setup (tailwind, cn) and ui components installed.
Otherwise, you can start by following the shadcn/ui [installation guide](https://ui.shadcn.com/docs/installation) and adding both `<Button />` and `<Label />` components into your project.

### Tailwind Animate Plugin

The Autocomplete component uses some animations of the [tailwindcss-animate plugin](https://github.com/jamiebuilds/tailwindcss-animate).<br />
You can install it by running the following command:

```bash
npm install -D tailwindcss-animate
```

Then add the plugin to your <u>tailwind.config.js</u> file:

```js
import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  // rest of your config...
  plugins: [tailwindAnimate],
}
```

### Command

The Autocomplete component is built on top of the shadcn's version `<Command />` component.

If it's not already in your project, you can follow the [installation guide](https://ui.shadcn.com/docs/components/command).<br />
Then, replace `<CommandItem />` className with the following:

```html
relative flex items-center px-2 py-1.5
cursor-default text-sm rounded-sm
select-none outline-none
data-[disabled=true]:pointer-events-none
data-[disabled=true]:opacity-50
data-[selected=true]:bg-accent
data-[selected=true]:text-accent-foreground
```

### Context

The Autocomplete global state is managed with the React Context api.
Copy and paste the following code into your project:

```tsx
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

type AutocompleteItemShape = {
  label: string;
  value: string;
};

type AutocompleteContextValue = {
  isOpen: boolean;
  isLoading: boolean;
  isEmpty: boolean;
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
  const [results, setResults] = useState<Array<AutocompleteItemShape>>([]);
  const [isOpen, setIsOpen] = useIsOpen({ open, defaultOpen, onOpenChange });
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
  const isEmpty = useIsEmpty({ isLoading, results, searchValue });

  useHandleKeyDown({ isOpen, setIsOpen });

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
  type AutocompleteItemShape,
  type AutocompleteContextValue,
  type AutocompleteProviderProps,
  AutocompleteProvider,
  useAutocomplete,
};
```

### Component

Copy and paste the following code into your project:

```tsx
import {
  forwardRef,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";
// Replace with your own icon library
import { XIcon } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

// Replace with your own path
import { cn } from "@/packages/core/utils/cn";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Label } from "../ui/label";
import {
  AutocompleteProvider,
  useAutocomplete,
  type AutocompleteProviderProps,
} from "./autocomplete.context";

const AutocompleteRoot = ({
  children,
  className,
}: ComponentPropsWithoutRef<"div">) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { setIsOpen } = useAutocomplete();

  useOnClickOutside(rootRef, () => {
    setIsOpen?.(false);
  });

  return (
    <div ref={rootRef} className={cn("relative w-full min-w-max", className)}>
      {children}
    </div>
  );
};

const Autocomplete = ({
  children,
  className,
  ...props
}: AutocompleteProviderProps & {
  className?: string;
}) => {
  return (
    <AutocompleteProvider {...props}>
      <AutocompleteRoot className={className}>{children}</AutocompleteRoot>
    </AutocompleteProvider>
  );
};

const AutocompleteLabel = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<typeof Label>
>(({ id, children, className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      htmlFor={id ? String(id) : undefined}
      className={cn("mb-1.5 block w-fit text-foreground", className)}
      {...props}
    >
      {children}
    </Label>
  );
});

const AutocompleteContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Command>
>(({ children, className, ...props }, ref) => {
  return (
    <Command
      ref={ref}
      shouldFilter={false}
      className={cn("duration-50 w-full shadow-none", className)}
      {...props}
    >
      {children}
    </Command>
  );
});

const AutocompleteInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<typeof CommandInput> & {
    onSearchChange?: (search: string) => void;
  }
>(
  (
    {
      children,
      className,
      id,
      placeholder: placeholderProp = "Type to search...",
      onSearchChange,
      ...props
    },
    ref,
  ) => {
    const { results, isLoading, searchValue, selectedValue, handleSearch } =
      useAutocomplete();

    const handleSearchChange = (search: string) => {
      handleSearch(search);
      onSearchChange?.(search);
    };

    const inputValue =
      results.find((item) => item.value === selectedValue)?.label ?? "";

    return (
      <div
        className={cn(
          "relative flex items-center rounded-md border border-input transition-colors focus-within:border-foreground focus-within:outline-none [&_*:is(div)]:w-full [&_*:is(div)]:border-b-0",
          className,
        )}
      >
        <CommandInput
          ref={ref}
          id={id ? String(id) : undefined}
          placeholder={isLoading ? "Loading..." : placeholderProp}
          className="pr-8 text-foreground"
          value={searchValue.length > 0 ? searchValue : inputValue}
          onValueChange={handleSearchChange}
          {...props}
        />
        {children}
      </div>
    );
  },
);

const AutocompleteClear = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Button> & { onClear?: () => void }
>(({ className, onClear, ...props }, ref) => {
  const { isOpen, searchValue, selectedValue, clearStates } = useAutocomplete();

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    clearStates();
    onClear?.();
  };

  if (!selectedValue && searchValue.length === 0) {
    return null;
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={handleClear}
      className={cn(
        "group pointer-events-none absolute right-0 opacity-0 transition-opacity hover:bg-transparent",
        (isOpen || searchValue.length > 0 || !!selectedValue) &&
          "pointer-events-auto opacity-100",
        className,
      )}
      {...props}
    >
      <XIcon className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
      <span className="sr-only">Clear</span>
    </Button>
  );
});

const AutocompleteList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandGroup>
>(({ children, className, ...props }, ref) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { isOpen, isLoading, isEmpty, results, setResults } = useAutocomplete();

  const state =
    isOpen && (results.length > 0 || isLoading || isEmpty) ? "open" : "closed";

  useEffect(() => {
    if (!isLoading && isOpen) {
      const nodeItems =
        listRef?.current?.querySelectorAll("[data-autocomplete-item]") ?? [];

      setResults?.(
        Array.from(nodeItems).map((item) => ({
          value: (item as HTMLElement).dataset.value ?? "",
          label: (item as HTMLElement).textContent ?? "",
        })),
      );
    }
  }, [children, isOpen, isLoading, setResults]);

  return (
    <CommandGroup
      ref={ref}
      data-state={state}
      className={cn(
        "AutocompleteList",
        "z-10 mt-1.5 max-h-[168px] overflow-y-auto",
        "absolute left-0 right-0 top-full",
        "rounded-md border bg-background",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:hidden",
        className,
      )}
      {...props}
    >
      <CommandList ref={listRef} className="overflow-y-hidden">
        {children}
      </CommandList>
    </CommandGroup>
  );
});

const AutocompleteItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandItem> & {
    onSelectChange?: (value: string) => void;
  }
>(({ children, className, value, onSelectChange, ...props }, ref) => {
  const { isLoading, handleSelect } = useAutocomplete();

  const handleSelectChange = (value: string) => {
    handleSelect(value);
    onSelectChange?.(value);
  };

  if (isLoading) {
    return null;
  }

  return (
    <CommandItem
      ref={ref}
      key={value}
      data-autocomplete-item=""
      value={value?.toString()}
      className={cn("cursor-pointer", className)}
      onSelect={handleSelectChange}
      {...props}
    >
      {children}
    </CommandItem>
  );
});

const AutocompleteLoading = forwardRef<
  HTMLUListElement,
  { className?: string; placeholders?: number }
>(({ className, placeholders = 3, ...props }, ref) => {
  const { isLoading, isEmpty } = useAutocomplete();

  if (!isLoading || isEmpty) {
    return null;
  }

  return (
    <ul ref={ref} className="space-y-1.5" {...props}>
      {Array.from({ length: placeholders }).map((_, index) => (
        <li
          key={index}
          className={cn(
            "h-8 animate-pulse rounded-md bg-accent duration-1000",
            className,
          )}
        />
      ))}
    </ul>
  );
});

const AutocompleteEmpty = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandEmpty>
>(({ children, ...props }, ref) => {
  const { isEmpty } = useAutocomplete();

  if (!isEmpty) {
    return null;
  }

  return (
    <CommandEmpty ref={ref} {...props}>
      {children ?? "No results found."}
    </CommandEmpty>
  );
});

export {
  Autocomplete,
  AutocompleteLabel,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteClear,
  AutocompleteLoading,
  AutocompleteEmpty,
};
```

That's it!