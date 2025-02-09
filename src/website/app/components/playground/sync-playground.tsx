import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
} from "@/packages/core/autocomplete/autocomplete";

import { useDemo } from "../../content/demo/demo.context";

export function SyncPlayground() {
  const { data, playground, handleClear, handleSearch, handleSelect } =
    useDemo();

  return (
    <Autocomplete
      async={false}
      className="md:w-[350px]"
      onSelectChange={handleSelect}
      // Simulate empty state
      open={!!playground.empty || undefined}
      searchValue={playground.empty === true ? "someone" : undefined}
    >
      {!!playground.label && (
        <AutocompleteLabel>Search for a user</AutocompleteLabel>
      )}
      <AutocompleteInput
        placeholder="Alice, Bob..."
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
        <AutocompleteEmpty>No users found.</AutocompleteEmpty>
      </AutocompleteList>
    </Autocomplete>
  );
}
