import { useAutocomplete } from "../../core/autocomplete/autocomplete.context";

export function ContextReader() {
  const context = useAutocomplete();

  return (
    <>
      <div data-testid="is-open">{context.isOpen.toString()}</div>
      <div data-testid="is-empty">{context.isEmpty.toString()}</div>
      <div data-testid="is-loading">{context.isLoading.toString()}</div>
      <div data-testid="is-error">{context.isError.toString()}</div>
      <div data-testid="search-value">{context.searchValue}</div>
      <div data-testid="selected-value">{context.selectedValue ?? "null"}</div>
      <div data-testid="results">{JSON.stringify(context.results)}</div>
    </>
  );
}
