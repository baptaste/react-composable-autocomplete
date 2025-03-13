# React Composable Autocomplete

A composable autocomplete component for React. Sync or async, built-in loading, error and empty states. Customizable, accessible, open source.

## Example usage

### Async

```tsx
<Autocomplete isLoading={isLoading} isError={isError}>
  <AutocompleteInput onSearch={handleSearch}>
    <AutocompleteClear onClear={handleClear} />
  </AutocompleteInput>
  <AutocompleteList>
    {movies.map((movie) => (
      <AutocompleteItem
        key={movie.value}
        value={movie.value}
        onSelect={handleSelect}
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
  <AutocompleteInput onSearch={handleSearch}>
    <AutocompleteClear onClear={handleClear} />
  </AutocompleteInput>
  <AutocompleteList>
    {users.map((user) => (
      <AutocompleteItem
        key={user.value}
        value={user.value}
        onSelect={handleSelect}
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
  /**
  Async state of the autocomplete. If true, the autocomplete won't filter the results.
  @default: true
  */
  async?: boolean;

  /**
  Default open state of the autocomplete.
  @default: false
  */
  defaultOpen?: boolean;

  /**
  Open state of the autocomplete (controlled).
  @default: undefined
  */
  open?: boolean;

  /**
  Default value of the input.
  @default: undefined
  */
  defaultValue?: string;

  /**
  Loading state of the autocomplete (controlled).
  @default: false
  */
  isLoading?: boolean;

  /**
  Error state of the autocomplete (controlled).
  @default: false
  */
  isError?: boolean;

  /**
  Sets open state of the autocomplete (controlled).
  @default: undefined
   */
  onOpenChange?: (open: boolean) => void;

  /**
  Sets search value of the autocomplete.
  @default: undefined
   */
  onSearch?: (search: string) => void;

  /**
  Sets selected value of the autocomplete.
  @default: undefined
   */
  onSelect?: (value: string | null) => void;
};
```

## Installation

Visit [react-composable-autocomplete.vercel.app](https://react-composable-autocomplete.vercel.app/) for full installation.