import { AutocompleteItem } from "@/components/autocomplete";

export function filterItems(search: string, items?: AutocompleteItem[]) {
  return (
    items?.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    ) ?? []
  );
}
