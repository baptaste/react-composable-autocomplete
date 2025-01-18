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

import { useDemo } from "../../content/demo/demo.context";
import { useSettings } from "../settings/settings.context";

export function AutocompletePlayground() {
  const { playground, resetPlayground } = useSettings();
  const { data, isLoading, isError, handleClear, handleSearch, handleSelect } =
    useDemo();

  return (
    <Autocomplete
      className="md:max-w-[350px]"
      isLoading={isLoading || playground.loading}
      isError={isError || playground.error}
      // simulate empty state
      defaultValue={playground.empty ? "asdfasdfasdf" : undefined}
      defaultOpen={playground.empty}
    >
      <AutocompleteContent>
        <AutocompleteInput
          placeholder="Search movies..."
          onSearchChange={handleSearch}
        >
          <AutocompleteClear
            onClear={() => {
              handleClear();
              resetPlayground();
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
