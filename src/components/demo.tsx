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
  type AutocompleteOption,
} from "./autocomplete/autocomplete";
import { OutputBlock } from "./output-block";
import { useSettings } from "./settings-provider";

export function Demo() {
  const { showOutput } = useSettings();

  const [posts, setPosts] = useState<AutocompleteOption[]>([]);
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

  return (
    <div className="flex w-full flex-col items-start justify-center gap-6 md:flex-row">
      <Autocomplete className="w-full md:w-1/2" isLoading={isLoading}>
        <AutocompleteLabel>Search posts</AutocompleteLabel>
        <AutocompleteContent>
          <AutocompleteInput onSearchChange={handleSearchPosts}>
            <AutocompleteClear onClear={() => setPosts([])} />
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
