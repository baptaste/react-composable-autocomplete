import { html } from "@/lib/utils/html";

import { CodeExample } from "./code-example";

export function ExampleUsageCode() {
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-2xl">Example Usage</h1>
      <CodeExample lang="tsx" example={example} />
    </div>
  );
}

const example =
html`  <Autocomplete isLoading={isLoading}>
    <AutocompleteLabel>Search posts</AutocompleteLabel>
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

