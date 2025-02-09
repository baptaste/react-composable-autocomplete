# Shadcn Basic Autocomplete

A composable autocomplete component for React. Sync or async, built-in loading, error and empty states. Customizable, accessible, open source.

## Example usage

### Async

```tsx
<Autocomplete isLoading={isLoading} isError={isError}>
  <AutocompleteInput onSearchChange={handleSearch}>
    <AutocompleteClear onClear={handleClear} />
  </AutocompleteInput>
  <AutocompleteList>
    {movies.map((movie) => (
      <AutocompleteItem
        key={movie.value}
        value={movie.value}
        onSelectChange={handleSelect}
      >
        {movie.label}
      </AutocompleteItem>
    ))}
    <AutocompleteLoading />
    <AutocompleteEmpty />
  </AutocompleteList>
  <AutocompleteError />
</Autocomplete>
```

### Sync

```tsx
<Autocomplete async={false}>
  <AutocompleteInput onSearchChange={handleSearch}>
    <AutocompleteClear onClear={handleClear} />
  </AutocompleteInput>
  <AutocompleteList>
    {users.map((user) => (
      <AutocompleteItem
        key={user.value}
        value={user.value}
        onSelectChange={handleSelect}
      >
        {user.label}
      </AutocompleteItem>
    ))}
    <AutocompleteEmpty />
  </AutocompleteList>
</Autocomplete>
```

## Props

```ts
type AutocompleteProviderProps = {
  /*
  Async state of the autocomplete. If true, the autocomplete won't filter the results.
  Default: true
  */
  async?: boolean;

  /*
  Default open state of the autocomplete.
  Default: false
  */
  defaultOpen?: boolean;

  /*
  Open state of the autocomplete (controlled).
  Default: undefined
  */
  open?: boolean;

  /*
  Default value of the input.
  Default: undefined
  */
  defaultValue?: string;

  /*
  Loading state of the autocomplete (controlled).
  Default: false
  */
  isLoading?: boolean;

  /*
  Error state of the autocomplete (controlled).
  Default: false
  */
  isError?: boolean;

  /*
  Sets open state of the autocomplete (controlled).
  Default: undefined
   */
  onOpenChange?: (open: boolean) => void;

  /*
  Sets search value of the autocomplete.
  Default: undefined
   */
  onSearchChange?: (search: string) => void;

  /*
  Sets selected value of the autocomplete.
  Default: undefined
   */
  onSelectChange?: (value: string | null) => void;
};
```

## Installation

Visit [shadcn-basic-autocomplete.vercel.app](https://shadcn-basic-autocomplete.vercel.app/) for full installation.