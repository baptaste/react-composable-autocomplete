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

import { useSettings } from "../../components/settings/settings.context";
import { useDemo } from "../demo/demo.context";

export function Playground() {
  const { playground } = useSettings();
  const { data, isLoading, isError, handleClear, handleSearch, handleSelect } =
    useDemo();

  return (
    <Autocomplete
      className="mb-16 md:max-w-[350px]"
      isLoading={isLoading || playground.loading}
      isError={isError || playground.error}
      onSelectChange={handleSelect}
    >
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
        <AutocompleteError />
      </AutocompleteContent>
    </Autocomplete>
  );
}
