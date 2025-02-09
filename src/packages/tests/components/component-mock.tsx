import { PropsWithChildren, useState } from "react";

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteError,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteProps,
} from "../../core/autocomplete/autocomplete";

const mockOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

function ComponentMock({
  children,
  label = false,
  isLoading = false,
  isError = false,
  ...props
}: PropsWithChildren<AutocompleteProps & { label?: boolean }>) {
  const [options, setOptions] = useState(mockOptions);

  const handleSearch = (search: string) => {
    const filteredOptions = mockOptions.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );
    setOptions(filteredOptions);
  };

  return (
    <Autocomplete isLoading={isLoading} isError={isError} {...props}>
      {label && <AutocompleteLabel>Test Label</AutocompleteLabel>}
      <AutocompleteInput
        data-testid="search-input"
        onSearchChange={handleSearch}
      >
        <AutocompleteClear data-testid="clear-button" />
      </AutocompleteInput>
      <AutocompleteError>Error occurred</AutocompleteError>
      <AutocompleteList>
        {options.map((option) => (
          <AutocompleteItem
            key={option.value}
            value={option.value}
            data-testid={`option-${option.value}`}
          >
            {option.label}
          </AutocompleteItem>
        ))}
        <AutocompleteEmpty />
      </AutocompleteList>

      {children}
    </Autocomplete>
  );
}

export { ComponentMock, mockOptions };
