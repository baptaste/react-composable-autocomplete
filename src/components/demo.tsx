import { useState } from "react";

import { fetchPosts } from "@/lib/utils/fetch-posts";

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteLoading,
  AutocompleteOption,
} from "./autocomplete/autocomplete";
import { OutputResults } from "./output-results";
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

  const handleSelectPost = (value: string | null) => {
    const post = posts.find(({ label }) => label === value);
    if (post) {
      setPosts([post]);
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-6 md:flex-row">
      <Autocomplete
        // className="w-full md:w-1/2"
        className="w-full md:w-[clamp(320px,50%,600px)]"
        isLoading={isLoading}
      >
        <AutocompleteLabel>Search posts</AutocompleteLabel>
        <AutocompleteContent>
          <AutocompleteInput onSearchChange={handleSearchPosts} />
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

      {showOutput && <OutputResults data={posts} />}
    </div>
  );
}
