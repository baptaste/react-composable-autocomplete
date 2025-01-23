import { html } from "@/website/app/lib/html";
import { cn } from "@/packages/core/utils/cn";

import { CodeBlock } from "../code-block";

export function SyncExampleUsageCode({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <h4 className="mb-6 border-b pb-2 text-xl">Example usage (sync)</h4>
      <CodeBlock lang="tsx" code={exampleUsageCode} />
    </div>
  );
}

const exampleUsageCode =
html`  <Autocomplete>
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
        <AutocompleteEmpty />
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>`;

