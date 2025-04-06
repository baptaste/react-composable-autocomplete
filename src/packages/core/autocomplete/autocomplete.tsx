import {
  Children,
  forwardRef,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type MouseEvent,
  type PropsWithChildren,
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
  AutocompleteHighlight,
  AutocompleteProvider,
  AutocompleteResult,
  useAutocomplete,
  type AutocompleteProviderProps,
} from "./autocomplete.context";

interface AutocompleteProps
  extends PropsWithChildren<AutocompleteProviderProps> {
  className?: string;
  /*
    Indicates if the autocomplete should be treated as a root component.
    If true, it will wrap the children with the AutocompleteProvider.
    Default: true
  */
  root?: boolean;
}

const Autocomplete = ({
  children,
  className,
  root = true,
  ...props
}: AutocompleteProps) => {
  const Root = root ? AutocompleteProvider : Fragment;

  return (
    <Root {...(root ? props : {})}>
      <div className={cn("relative w-full", className)}>
        <AutocompleteContent>{children}</AutocompleteContent>
      </div>
    </Root>
  );
};

const AutocompleteLabel = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<typeof Label>
>(({ id, className, ...props }, ref) => {
  const { isError } = useAutocomplete();

  return (
    <Label
      ref={ref}
      data-autocomplete-label=""
      htmlFor={id ? String(id) : undefined}
      className={cn(
        "mb-2 block w-fit text-foreground",
        isError && "text-destructive",
        className,
      )}
      {...props}
    />
  );
});

const AutocompleteContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Command>
>(({ children, className, ...props }, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useAutocomplete();

  useImperativeHandle(ref, () => contentRef.current!);

  useOnClickOutside(contentRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <Command
      ref={contentRef}
      data-autocomplete-content=""
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
  Omit<
    ComponentPropsWithoutRef<typeof CommandInput>,
    "onValueChange" | "defaultValue" | "value"
  > & {
    searchValue?: string;
    onSearch?: (search: string) => void;
  }
>(
  (
    {
      children,
      className,
      searchValue: searchValueProp,
      id,
      placeholder = "Type to search...",
      onSearch,
      ...props
    },
    ref,
  ) => {
    const {
      results,
      isError,
      isLoading,
      searchValue: searchValueCtx,
      selectedValue,
      handleSearch,
      handleSelect,
    } = useAutocomplete();

    const searchValue = searchValueProp ?? searchValueCtx;

    const inputValue =
      searchValue.length > 0
        ? searchValue
        : selectedValue !== null
          ? results.get(selectedValue)?.label
          : "";

    const handleSearchChange = (search: string) => {
      handleSearch(search);
      onSearch?.(search);
    };

    const handleTabKeyPress = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Tab") return;

        const firstResult = results.values().next().value;
        handleSelect(firstResult?.value ?? null);
      },
      [results, handleSelect],
    );

    return (
      <div
        data-autocomplete-input=""
        className={cn(
          "relative flex items-center rounded-md border border-input transition-colors focus-within:outline-none [&_*:is(div)]:w-full [&_*:is(div)]:border-b-0",
          isError ? "border-destructive" : "focus-within:border-foreground",
          className,
        )}
      >
        <CommandInput
          ref={ref}
          {...props}
          id={id ? String(id) : undefined}
          className="pr-8 text-foreground"
          placeholder={isLoading ? "Loading..." : placeholder}
          value={inputValue}
          onValueChange={handleSearchChange}
          onKeyDown={handleTabKeyPress}
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
      data-autocomplete-clear=""
      variant="ghost"
      onClick={handleClear}
      className={cn(
        "group pointer-events-none absolute right-0 opacity-0 transition-opacity hover:bg-transparent focus-visible:ring-0",
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
  const {
    async,
    isOpen,
    isError,
    isLoading,
    isEmpty,
    searchValue,
    results,
    setResults,
  } = useAutocomplete();

  const listRef = useRef<HTMLDivElement>(null);
  const cachedResults = useRef<Array<AutocompleteResult>>([]);

  const state = isError ? "closed" : isOpen || isLoading ? "open" : "closed";

  const getNodeResults = useCallback(() => {
    return Array.from(
      listRef.current?.querySelectorAll("[data-autocomplete-item]") ?? [],
    ).map((item) => ({
      value: (item as HTMLElement).dataset.value ?? "",
      label: (item as HTMLElement).textContent ?? "",
    })) as AutocompleteResult[];
  }, []);

  useEffect(() => {
    if (listRef.current) {
      cachedResults.current = getNodeResults();
    }
  }, [getNodeResults]);

  useEffect(() => {
    if (!isOpen) return;
    if (!searchValue.length) return;
    if (isLoading) return;

    let results: AutocompleteResult[] = getNodeResults();

    if (!async) {
      results = cachedResults.current.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    setResults(new Map(results.map((item) => [item.value, item])));
  }, [async, isOpen, isLoading, searchValue, getNodeResults]);

  return (
    <CommandGroup
      ref={ref}
      data-autocomplete-list=""
      data-state={state}
      className={cn(
        "z-10 mt-1.5",
        "absolute left-0 right-0 top-full w-full",
        "rounded-md border bg-background",
        "data-[state=open]:motion-safe:animate-in data-[state=closed]:motion-safe:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:hidden",
        className,
      )}
      {...props}
    >
      <CommandList ref={listRef} className="max-h-[168px]">
        {async
          ? children
          : Children.map(children, (child) => {
              if (!searchValue || isEmpty) {
                return child;
              }
              if (isValidElement(child) && results.has(child.props.value)) {
                return child;
              }
              return null;
            })}
      </CommandList>
    </CommandGroup>
  );
});

const AutocompleteItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandItem> & {
    highlight?: AutocompleteHighlight;
  }
>(
  (
    {
      children,
      className,
      value,
      onSelect,
      highlight: highlightProp = "include",
      ...props
    },
    ref,
  ) => {
    const {
      async,
      highlight: highlightCtx,
      isLoading,
      isOpen,
      isEmpty,
      isError,
      searchValue,
      results,
      canSelect,
      handleSelect,
    } = useAutocomplete();
    const highlight = highlightProp ?? highlightCtx;

    const handleSelectChange = (value: string) => {
      handleSelect(value);
      onSelect?.(value);
    };

    if (isLoading || (!async && (isEmpty || isError))) {
      return null;
    }

    const regex = new RegExp("(" + searchValue + ")", "gi");
    const result = results.get(value?.toString() ?? "");
    const label = result?.label ?? "";
    const parts = label.split(regex);

    return (
      <CommandItem
        ref={ref}
        data-autocomplete-item=""
        value={value?.toString()}
        onSelect={handleSelectChange}
        className={cn(
          "cursor-pointer px-3 py-2",
          { hidden: !async && isOpen && !canSelect(value) },
          className,
        )}
        {...props}
      >
        {highlight && result ? (
          <span>
            {parts.filter(Boolean).map((part, index) => (
              <span
                key={index}
                className={cn(
                  "font-normal",
                  highlight === "include" && regex.test(part) && "font-bold",
                  highlight === "exclude" && !regex.test(part) && "font-bold",
                )}
              >
                {part}
              </span>
            ))}
          </span>
        ) : (
          children
        )}
      </CommandItem>
    );
  },
);

const AutocompleteEmpty = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandEmpty>
>(({ children, className, ...props }, ref) => {
  const { isEmpty } = useAutocomplete();

  if (!isEmpty) return null;

  return (
    <CommandEmpty
      ref={ref}
      {...props}
      className={cn("text-pretty px-3 py-4 text-center text-sm", className)}
    >
      {children ?? "No results found."}
    </CommandEmpty>
  );
});

const AutocompleteLoading = forwardRef<
  HTMLUListElement,
  ComponentPropsWithoutRef<"ul"> & {
    className?: string;
    loaders?: number;
    loaderClassName?: string;
  }
>(({ className, loaders = 3, loaderClassName, ...props }, ref) => {
  const { async, isLoading, isEmpty } = useAutocomplete();

  if (!async || !isLoading || isEmpty) return null;

  return (
    <ul ref={ref} className={cn("space-y-1.5", className)} {...props}>
      {Array.from({ length: loaders }).map((_, index) => (
        <li
          key={index}
          className={cn(
            "duration-800 h-9 rounded-md bg-accent motion-safe:animate-pulse",
            loaderClassName,
          )}
        />
      ))}
    </ul>
  );
});

const AutocompleteError = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(({ children, className, ...props }, ref) => {
  const { async, isError } = useAutocomplete();

  if (!async || !isError) return null;

  return (
    <p
      ref={ref}
      data-autocomplete-error=""
      {...props}
      className={cn("mt-1 text-sm text-destructive", className)}
    >
      {children ?? "An error occurred. Please try again later."}
    </p>
  );
});

export {
  type AutocompleteProps,
  Autocomplete,
  AutocompleteLabel,
  AutocompleteInput,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteLoading,
  AutocompleteError,
};
