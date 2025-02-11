import { html } from "@/website/app/lib/html";
import { cn } from "@/packages/core/utils/cn";

import { useDemo } from "../../content/demo/demo.context";
import { CodeBlock } from "../code-block";

export function SyncExampleUsageCode({ className }: { className?: string }) {
  const { playground } = useDemo();
  const code = playground.label ? exampleUsageWithLabelCode : exampleUsageCode;

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <h4 className="mb-4 text-foreground text-xl">Example usage (sync)</h4>
      <CodeBlock lang="tsx" code={code} />
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

const exampleUsageWithLabelCode =
html`  <Autocomplete async={false}>
    <AutocompleteLabel>Search for a user</AutocompleteLabel>
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