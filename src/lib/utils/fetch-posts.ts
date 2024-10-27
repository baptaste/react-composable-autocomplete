import type { AutocompleteOption } from "@/components/autocomplete/autocomplete";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts(search = ""): Promise<AutocompleteOption[]> {
  const response = await fetch(`${API_URL}?title_like=^${search}`);
  const posts = await response.json();

  return posts.map((post: { id: number; title: string }) => ({
    label: post.title,
    value: post.id,
  }));
}
