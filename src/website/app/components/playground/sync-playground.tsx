import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@/packages/core/autocomplete/autocomplete";

import { useDemo } from "../../content/demo/demo.context";
import { usersMock } from "../../lib/mocks";

export function SyncPlayground() {
  const { data, isEmpty, handleClear, handleSearch, handleSelect } = useDemo();

  return (
    <Autocomplete
      className="md:max-w-[350px]"
      defaultResults={usersMock}
      // simulate empty state
      defaultValue={isEmpty ? "asdfasdfasdf" : undefined}
      defaultOpen={isEmpty}
    >
      <AutocompleteContent>
        <AutocompleteInput
          placeholder="Alice, Bob..."
          onSearchChange={handleSearch}
        >
          <AutocompleteClear onClear={handleClear} />
        </AutocompleteInput>
        <AutocompleteList className="z-50">
          {data.map((item) => (
            <AutocompleteItem
              key={item.value}
              value={item.value}
              onSelectChange={handleSelect}
            >
              {item.label}
            </AutocompleteItem>
          ))}
          <AutocompleteEmpty />
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}
