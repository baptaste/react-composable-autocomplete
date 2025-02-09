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
html`  <Autocomplete async={false}>
    <AutocompleteInput onSearchChange={handleSearch}>
      <AutocompleteClear onClear={handleClear} />
    </AutocompleteInput>
    <AutocompleteList>
      {users.map((user) => (
        <AutocompleteItem
          key={user.value}
          value={user.value}
         onSelectChange={handleSelect}
        >
          {user.label}
        </AutocompleteItem>
      ))}
      <AutocompleteEmpty>No users found.</AutocompleteEmpty>
    </AutocompleteList>
  </Autocomplete>`;

