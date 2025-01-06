import { useCallback, useState } from "react";

import { AutocompleteOption } from "@/packages/core/autocomplete/autocomplete.context";

import { fetchPosts } from "../../lib/posts-api";

export function usePlayground() {
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

  return {
    posts,
    isLoading,
    handleSearchPosts,
    handleSelectPost,
    handleClearPosts,
  };
}
