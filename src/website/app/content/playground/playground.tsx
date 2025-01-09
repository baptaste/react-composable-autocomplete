import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteLoading,
} from "@/packages/core/autocomplete/autocomplete";

import { useDemo } from "../demo/demo.context";

export function Playground() {
  const { data, isLoading, handleClear, handleSearch, handleSelect } =
    useDemo();

  return (
    <Autocomplete className="mb-16 md:max-w-[350px]" isLoading={isLoading}>
      <AutocompleteContent>
        <AutocompleteInput onSearchChange={handleSearch}>
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
          <AutocompleteLoading />
          <AutocompleteEmpty />
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}
