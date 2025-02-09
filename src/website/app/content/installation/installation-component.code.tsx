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
    Fragment,
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
    AutocompleteProvider,
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

    useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

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
      onSearchChange?: (search: string) => void;
    }
  >(
    (
      {
        children,
        className,
        searchValue: searchValueProp,
        id,
        placeholder = "Type to search...",
        onSearchChange,
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
          : ((selectedValue && results.get(selectedValue)?.label) ?? "");

      const handleSearchChange = (search: string) => {
        handleSearch(search);
        onSearchChange?.(search);
      };

      const handleTabKeyPress = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key !== "Tab") return;

          const firstResultItem = results.values().next().value;
          handleSelect(firstResultItem?.value ?? null);
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
    const listRef = useRef<HTMLDivElement>(null);

    const { async, isOpen, isError, isLoading, searchValue, setResults } =
      useAutocomplete();

    const state = isError ? "closed" : isOpen || isLoading ? "open" : "closed";

    useEffect(() => {
      if (isLoading || !isOpen || !listRef?.current) return;

      const nodeResults = Array.from(
        listRef.current.querySelectorAll("[data-autocomplete-item]"),
      ).map((item) => ({
        value: (item as HTMLElement).dataset.value ?? "",
        label: (item as HTMLElement).textContent ?? "",
      }));

      if (!async) {
        // Manual filter results based on search value
        const filteredResults = nodeResults.filter((item) =>
          item.label.toLowerCase().includes(searchValue.toLowerCase()),
        );

        return void setResults(
          new Map(filteredResults.map((item) => [item.value, item])),
        );
      }

      setResults(new Map(nodeResults.map((item) => [item.value, item])));
    }, [children, async, isOpen, isLoading, searchValue, setResults]);

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
          {children}
        </CommandList>
      </CommandGroup>
    );
  });

  const AutocompleteItem = forwardRef<
    HTMLDivElement,
    Omit<ComponentPropsWithoutRef<typeof CommandItem>, "onSelect"> & {
      onSelectChange?: (value: string) => void;
    }
  >(({ children, className, value, onSelectChange, ...props }, ref) => {
    const {
      async,
      isLoading,
      isOpen,
      isEmpty,
      isError,
      canSelect,
      handleSelect,
    } = useAutocomplete();

    // Sync items state only
    const hidden = !async && isOpen && !canSelect(value);

    const handleSelectChange = (value: string) => {
      handleSelect(value);
      onSelectChange?.(value);
    };

    if (isLoading || (!async && (isEmpty || isError))) {
      return null;
    }

    return (
      <CommandItem
        ref={ref}
        data-autocomplete-item=""
        value={value?.toString()}
        onSelect={handleSelectChange}
        className={cn("cursor-pointer px-3 py-2", { hidden }, className)}
        {...props}
      >
        {children}
      </CommandItem>
    );
  });

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
    { className?: string; placeholders?: number }
  >(({ className, placeholders = 3, ...props }, ref) => {
    const { async, isLoading, isEmpty } = useAutocomplete();

    if (!async || !isLoading || isEmpty) return null;

    return (
      <ul ref={ref} className="space-y-1.5" {...props}>
        {Array.from({ length: placeholders }).map((_, index) => (
          <li
            key={index}
            className={cn(
              "duration-800 h-9 rounded-md bg-accent motion-safe:animate-pulse",
              className,
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
  };`;
