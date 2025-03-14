import { html } from "@/website/app/lib/html";
import { cn } from "@/packages/core/utils/cn";

import { useDemo } from "../../content/demo/demo.context";
import { CodeBlock } from "../code-block";

export function AsyncUsageCode({ className }: { className?: string }) {
  const { playground } = useDemo();
  const code = playground.label ? usageWithLabelCode : usageCode;

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <h1 className="mb-4 text-foreground text-xl">Usage (async)</h1>
      <CodeBlock lang="tsx" code={code} />
    </div>
  );
}

const usageCode =
html`  <Autocomplete isLoading={isLoading} isError={isError}>
    <AutocompleteInput onSearch={handleSearch}>
      <AutocompleteClear onClear={handleClear} />
    </AutocompleteInput>
    <AutocompleteList>
      {movies.map((movie) => (
        <AutocompleteItem
          key={movie.value}
          value={movie.value}
         onSelect={handleSelect}
        >
          {movie.label}
        </AutocompleteItem>
      ))}
      <AutocompleteLoading />
      <AutocompleteEmpty>
        No movies found. Try searching for something else.
      </AutocompleteEmpty>
    </AutocompleteList>
    <AutocompleteError />
  </Autocomplete>`;

const usageWithLabelCode =
html`  <Autocomplete isLoading={isLoading} isError={isError}>
    <AutocompleteLabel>Search for a movie</AutocompleteLabel>
    <AutocompleteInput onSearch={handleSearch}>
      <AutocompleteClear onClear={handleClear} />
    </AutocompleteInput>
    <AutocompleteList>
      {movies.map((movie) => (
        <AutocompleteItem
          key={movie.value}
         value={movie.value}
         onSelect={handleSelect}
        >
          {movie.label}
        </AutocompleteItem>
      ))}
      <AutocompleteLoading />
      <AutocompleteEmpty>
        No movies found. Try searching for something else.
      </AutocompleteEmpty>
    </AutocompleteList>
    <AutocompleteError />
  </Autocomplete>`;