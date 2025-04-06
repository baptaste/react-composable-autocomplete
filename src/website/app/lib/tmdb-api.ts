import type { AutocompleteResult } from "@/packages/core/autocomplete/autocomplete.context";

import { TMDB_MOVIES_API_URL } from "./constants";

export async function fetchTmdbMovies(
  search = "",
): Promise<AutocompleteResult[]> {
  const response = await fetch(
    `${TMDB_MOVIES_API_URL}?include_adult=false&language=en-US&query=${search}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
      },
    },
  );

  const data = await response.json();

  return data.results.map(
    (movie: { id: number; title: string; release_date: string }) => {
      const year =
        movie.release_date?.length > 0
          ? new Date(movie.release_date).getFullYear()
          : "N/A";

      return {
        label: `${movie.title} (${year})`,
        value: movie.id,
      };
    },
  );
}
