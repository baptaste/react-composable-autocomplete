import type { AutocompleteItemShape } from "@/packages/core/autocomplete/autocomplete.context";

import { POSTS_API_URL } from "./constants";

export async function fetchPosts(
  search = "",
): Promise<AutocompleteItemShape[]> {
  const response = await fetch(`${POSTS_API_URL}?title_like=^${search}`);

  const posts = await response.json();

  return posts.map((post: { id: number; title: string }) => ({
    label: post.title,
    value: post.id,
  }));
}
