import { AutocompleteOption } from "./autocomplete/autocomplete";
import { Label } from "./ui/label";

export function OutputResults({ data }: { data: AutocompleteOption[] }) {
  return (
    <div className="block h-[231px] w-1/2 overflow-x-hidden rounded-md border border-background">
      <Label className="mb-1.5 block w-fit text-foreground">JSON Output</Label>
      <pre className="block overflow-auto rounded-md bg-border p-3 text-xs text-foreground">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
