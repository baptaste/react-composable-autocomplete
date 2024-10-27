import {
  forwardRef,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
} from "react";
// Replace with your own icon library
import { Cross2Icon } from "@radix-ui/react-icons";

// Replace with your own path
import { cn } from "@/lib/utils/cn";
import { filterItems } from "@/lib/utils/filter-items";

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
import { AutocompleteProvider, useAutocomplete } from "./autocomplete.context";

type AutocompleteOption = {
  label: string;
  value: string;
};

const Autocomplete = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & {
    className?: string;
    defaultOpen?: boolean;
    isLoading?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ children, className, ...props }, ref) => {
  return (
    <AutocompleteProvider {...props}>
      <div
        ref={ref}
        data-autocomplete=""
        className={cn("relative w-full min-w-max", className)}
      >
        {children}
      </div>
    </AutocompleteProvider>
  );
});

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
  const { focused, setFocused } = useAutocomplete();

  return (
    <Command
      ref={ref}
      shouldFilter={false}
      onClick={() => setFocused(true)}
      className={cn(
        "duration-50 w-full rounded-t-md border shadow-none",
        // open && "rounded-b-none",
        focused && "border-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Command>
  );
});

const AutocompleteInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<typeof CommandInput> & {
    onSearchChange?: (search: string, results: AutocompleteOption[]) => void;
  }
>(
  (
    {
      className,
      id,
      name,
      placeholder: placeholderProp = "Type a command or search...",
      onSearchChange,
      ...props
    },
    ref,
  ) => {
    const {
      items,
      isLoading,
      open,
      setOpen,
      searchValue,
      setSearchValue,
      selectedValue,
      setSelectedValue,
      setItems,
      onOpenChange,
      clearStates,
    } = useAutocomplete();

    const updateIsOpen = useCallback(
      (value: string) => {
        let isOpen = open;

        if (!open && value.length) {
          isOpen = true;
        } else if (open && !value.length) {
          isOpen = false;
        }

        setOpen(isOpen);
        onOpenChange?.(isOpen);
      },
      [open, setOpen, onOpenChange],
    );

    const handleSearchChange = useCallback(
      (value: string) => {
        setSearchValue(value);
        updateIsOpen(value);

        if (selectedValue) {
          setSelectedValue(null);
        }

        if (!value.length) {
          setItems([]);
          onSearchChange?.(value, []);
        } else {
          onSearchChange?.(value, filterItems(value, items));
        }
      },
      [
        selectedValue,
        items,
        setItems,
        setSelectedValue,
        onSearchChange,
        setSearchValue,
        updateIsOpen,
      ],
    );

    const handleClear = (e: MouseEvent) => {
      e.stopPropagation();
      clearStates();
      onSearchChange?.("", []);
    };

    return (
      <div
        className={cn(
          "relative flex items-center [&_*:is(div)]:w-full [&_*:is(div)]:border-b-0",
        )}
      >
        <CommandInput
          ref={ref}
          id={id ? String(id) : undefined}
          name={name}
          placeholder={isLoading ? "Loading..." : placeholderProp}
          className={cn("pr-8", className)}
          value={searchValue.length ? searchValue : (selectedValue ?? "")}
          onValueChange={handleSearchChange}
          {...props}
        />
        <Button
          variant="ghost"
          onClick={handleClear}
          className={cn(
            "pointer-events-none absolute right-0 opacity-0 transition-opacity hover:bg-transparent",
            (open || searchValue.length > 0 || !!selectedValue) &&
              "pointer-events-auto opacity-100",
          )}
        >
          <Cross2Icon className="h-4 w-4 opacity-50 transition-opacity hover:opacity-100" />
          <span className="sr-only">Clear</span>
        </Button>
      </div>
    );
  },
);

const AutocompleteList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandGroup>
>(({ children, className, ...props }, ref) => {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const { open, searchValue, isLoading, setItems } = useAutocomplete();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (open && searchValue.length && internalRef.current) {
      const items = Array.from(
        internalRef.current.querySelectorAll("[data-autocomplete-item]") ?? [],
      );

      setItems(
        items.map((item) => {
          return {
            value: (item as HTMLElement).dataset.value ?? "",
            label: item.textContent ?? "",
          };
        }),
      );
    }
  }, [open, isLoading, searchValue, setItems]);

  return (
    <CommandGroup
      ref={ref}
      data-state={open ? "open" : "closed"}
      className={cn(
        "max-h-[168px] overflow-y-auto pt-2",
        "absolute left-0 right-0 top-full",
        "rounded-b-md border-x border-b bg-background",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        !isLoading && !open && "hidden",
        className,
      )}
      {...props}
    >
      <CommandList ref={internalRef}>{children}</CommandList>
    </CommandGroup>
  );
});

const AutocompleteItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandItem> & {
    onSelectChange?: (value: string | null) => void;
  }
>(({ children, className, value, onSelectChange, ...props }, ref) => {
  const {
    isLoading,
    items,
    setOpen,
    setSelectedValue,
    setSearchValue,
    setItems,
    onOpenChange,
  } = useAutocomplete();

  const handleSelectChange = (value: string) => {
    console.log("AutocompleteItem handleSelectChange", { value });

    const selectedItem = items.find((item) => item.value === value);

    if (!selectedItem) {
      return;
    }

    setSelectedValue(value);
    setItems([selectedItem]);
    setOpen(false);
    setSearchValue("");
    onOpenChange?.(false);
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
      data-value={value}
      value={value}
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
  const { open, isLoading } = useAutocomplete();

  if (!isLoading || !open) {
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
  AutocompleteLoading,
  AutocompleteEmpty,
  type AutocompleteOption,
};
