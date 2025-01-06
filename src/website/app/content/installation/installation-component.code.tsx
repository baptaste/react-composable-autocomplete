import { html } from "@/website/app/lib/html";

import { CodeBlock } from "../../components/code-block";
import {
  InstallationBlock,
  InstallationBlockContent,
  InstallationBlockDescription,
  InstallationBlockTitle
} from "./installation-block";

export function InstallationComponentCode() {
  return (
    <InstallationBlock>
      <InstallationBlockTitle>Component</InstallationBlockTitle>
      <InstallationBlockContent>
        <InstallationBlockDescription>
          Copy and paste the following code into your project:
        </InstallationBlockDescription>
      </InstallationBlockContent>
      <CodeBlock lang="tsx" code={componentInstallationCode} />
    </InstallationBlock>
  );
}

const componentInstallationCode =
html`  import {
    forwardRef,
    useEffect,
    useRef,
    type ComponentPropsWithoutRef,
    type MouseEvent,
  } from "react";
   // Replace with your own icon library
   import { XIcon } from "lucide-react";

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
        placeholder: placeholderProp = "Search...",
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
        <Cross2Icon className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
        <span className="sr-only">Clear</span>
      </Button>
    );
  });

  const AutocompleteList = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<typeof CommandGroup>
  >(({ children, className, ...props }, ref) => {
    const { isOpen, isLoading, setResults } = useAutocomplete();
    const listRef = useRef<HTMLDivElement>(null);

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
    }, [isOpen, isLoading, setResults]);

    return (
      <CommandGroup
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "z-10 mt-1.5 max-h-[168px] overflow-y-auto",
          "absolute left-0 right-0 top-full",
          "rounded-md border bg-background",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          !isLoading && !isOpen && "hidden",
          className,
        )}
        {...props}
      >
        <CommandList ref={listRef} className="overflow-y-hidden">{children}</CommandList>
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
  };`;
