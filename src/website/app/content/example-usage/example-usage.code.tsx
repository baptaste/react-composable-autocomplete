import { html } from "@/website/app/lib/html";
import { CodeBlock } from "../../components/code-block";

export function ExampleUsageCode() {
  return (
    <div className="flex flex-col gap-y-4 md:w-1/2">
      <h4 className="text-foreground">Usage</h4>
      <CodeBlock lang="tsx" code={exampleUsageCode} />
    </div>
  );
}

const exampleUsageCode =
html`  <Autocomplete isLoading={isLoading}>
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
      <AutocompleteError />
    </AutocompleteContent>
  </Autocomplete>`;

