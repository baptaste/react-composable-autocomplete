import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteError,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteLoading,
} from "@/packages/core/autocomplete/autocomplete";

import { useDemo } from "../../content/demo/demo.context";

export function AsyncPlayground() {
  const {
    data,
    isLoading,
    isError,
    playground,
    handleClear,
    handleSearch,
    handleSelect,
  } = useDemo();

  return (
    <Autocomplete
      className="md:w-[350px]"
      isLoading={isLoading}
      isError={isError}
      onSelectChange={handleSelect}
      // Simulate empty state
      open={!!playground.empty || undefined}
      searchValue={playground.empty === true ? "asdfasdf" : undefined}
    >
      {!!playground.label && (
        <AutocompleteLabel>Search for a movie</AutocompleteLabel>
      )}
      <AutocompleteInput
        placeholder="Search movies..."
        onSearchChange={handleSearch}
      >
        <AutocompleteClear onClear={handleClear} />
      </AutocompleteInput>
      <AutocompleteList>
        {data.map((item) => (
          <AutocompleteItem
            key={item.value}
            value={item.value}
            onSelectChange={handleSelect}
          >
            {item.label}
          </AutocompleteItem>
        ))}
        <AutocompleteLoading />
        <AutocompleteEmpty>
          No movies found. Try searching for something else.
        </AutocompleteEmpty>
      </AutocompleteList>
      <AutocompleteError />
    </Autocomplete>
  );
}
