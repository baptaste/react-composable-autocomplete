import { html } from "@/website/app/lib/html";
import { cn } from "@/packages/core/utils/cn";

import { CodeBlock } from "../code-block";

export function AsyncExampleUsageCode({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <h1 className="mb-6 border-b pb-2 text-xl">Example usage (async)</h1>
      <CodeBlock lang="tsx" code={exampleUsageCode} />
    </div>
  );
}

const exampleUsageCode =
html`  <Autocomplete isLoading={isLoading} isError={isError}>
    <AutocompleteInput onSearchChange={handleSearch}>
      <AutocompleteClear onClear={handleClear} />
    </AutocompleteInput>
    <AutocompleteList>
      {movies.map((movie) => (
        <AutocompleteItem
          key={movie.value}
          value={movie.value}
         onSelectChange={handleSelect}
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

