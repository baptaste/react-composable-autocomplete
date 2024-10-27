import { AutocompleteOption } from "./autocomplete/autocomplete";
import { Label } from "./ui/label";

export function OutputResults({ data }: { data: AutocompleteOption[] }) {
  return (
    <div className="block h-[231px] w-full overflow-x-hidden rounded-md border border-background md:w-1/2">
      <Label className="mb-1.5 block w-fit text-foreground">Output</Label>
      <pre className="block overflow-auto rounded-md bg-secondary-foreground/90 p-3 text-xs text-background">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}
