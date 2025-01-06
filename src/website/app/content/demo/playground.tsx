import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteLoading,
} from "@/packages/core/autocomplete/autocomplete";
import { cn } from "@/packages/core/utils/cn";

import { OutputBlock } from "../../components/output-block";
import { useSettings } from "../../components/settings/settings.context";
import { usePlayground } from "./use-playground";

export function Playground() {
  const { showOutput } = useSettings();
  const {
    posts,
    isLoading,
    handleClearPosts,
    handleSearchPosts,
    handleSelectPost,
  } = usePlayground();

  return (
    <div className={cn("mb-20 flex w-full flex-col items-center gap-6")}>
      <Autocomplete isLoading={isLoading} className="md:max-w-[350px]">
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
      </Autocomplete>

      {showOutput && <OutputBlock data={posts} />}
    </div>
  );
}
