import { useCallback, useState } from "react";

import { fetchPosts } from "@/lib/utils/fetch-posts";

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
} from "./autocomplete/autocomplete";
import type { AutocompleteOption } from "./autocomplete/autocomplete.context";
import { OutputBlock } from "./output-block";
import { useSettings } from "./settings/settings-provider";

export function Demo() {
  const { showOutput } = useSettings();

  const [posts, setPosts] = useState<Array<AutocompleteOption>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchPosts = async (search: string) => {
    if (!search.length) {
      setPosts([]);
      return;
    }
    setIsLoading(true);
    const data = await fetchPosts(search);
    setPosts(data);
    setIsLoading(false);
  };

  const handleSelectPost = useCallback(
    (value: string) => {
      const post = posts.find(
        (post) => post.value.toString() === value || post.label === value,
      );

      if (post) {
        setPosts([post]);
      }
    },
    [posts],
  );

  const handleClearPosts = () => setPosts([]);

  return (
    <div className="flex w-full flex-col items-center gap-6 md:mb-36">
      <Autocomplete isLoading={isLoading} className="md:max-w-[400px]">
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

      {/* {showOutput && <OutputBlock data={posts} />} */}
    </div>
  );
}
