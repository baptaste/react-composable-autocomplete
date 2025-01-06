import { html } from "@/website/app/lib/html";
import { CodeBlock } from "../../components/code-block";

export function ExampleUsageCode() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-xl">Usage</h1>
      <CodeBlock lang="tsx" code={exampleUsageCode} />
    </div>
  );
}

const exampleUsageCode =
html`  <Autocomplete isLoading={isLoading}>
    <AutocompleteLabel>Search</AutocompleteLabel>
    <AutocompleteContent>
      <AutocompleteInput onSearchChange={handleSearchPosts}>
        <AutocompleteClear onClear={handleClearPosts} />
      </AutocompleteInput>
      <AutocompleteList>
        {posts.map((post) => (
          <AutocompleteItem
            key={post.value}
            value={post.value}
            onSelectChange={handleSelectPost}
          >
            {post.label}
          </AutocompleteItem>
        ))}
        <AutocompleteLoading />
        <AutocompleteEmpty />
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>`;

