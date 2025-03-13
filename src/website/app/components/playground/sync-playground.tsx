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
import { usersMock } from "../../lib/mocks";

export function SyncPlayground() {
  const { playground, handleClear, handleSearch, handleSelect } = useDemo();

  return (
    <Autocomplete
      async={false}
      className="md:w-[350px]"
      onSelect={handleSelect}
      // Simulate empty state
      open={!!playground.empty || undefined}
      searchValue={playground.empty === true ? "someone" : undefined}
    >
      {!!playground.label && (
        <AutocompleteLabel>Search for a user</AutocompleteLabel>
      )}
      <AutocompleteInput placeholder="Alice, Bob..." onSearch={handleSearch}>
        <AutocompleteClear onClear={handleClear} />
      </AutocompleteInput>
      <AutocompleteList>
        {usersMock.map((item) => (
          <AutocompleteItem
            key={item.value}
            value={item.value}
            onSelect={handleSelect}
          >
            {item.label}
          </AutocompleteItem>
        ))}
        <AutocompleteEmpty>No users found.</AutocompleteEmpty>
      </AutocompleteList>
    </Autocomplete>
  );
}
