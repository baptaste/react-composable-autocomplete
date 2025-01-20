import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteError,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteLoading,
} from "@/packages/core/autocomplete/autocomplete";

import { useDemo } from "../content/demo/demo.context";

export function AutocompletePlayground() {
  const {
    data,
    isLoading,
    isError,
    isEmpty,
    handleClear,
    handleSearch,
    handleSelect,
  } = useDemo();

  return (
    <Autocomplete
      className="md:max-w-[350px]"
      isLoading={isLoading}
      isError={isError}
      // simulate empty state
      defaultValue={isEmpty ? "asdfasdfasdf" : undefined}
      defaultOpen={isEmpty}
      onSelectChange={handleSelect}
    >
      <AutocompleteContent>
        <AutocompleteInput
          placeholder="Search movies..."
          onSearchChange={handleSearch}
        >
          <AutocompleteClear
            onClear={() => {
              handleClear();
            }}
          />
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
        <AutocompleteError />
      </AutocompleteContent>
    </Autocomplete>
  );
}
