import { AutocompleteOption } from "./autocomplete/autocomplete";
import { CodeBlock } from "./code-block";
import { Label } from "./ui/label";

export function OutputBlock({ data }: { data: AutocompleteOption[] }) {
  return (
    <div className="block max-h-[231px] w-full overflow-x-hidden rounded-md border border-background md:w-1/2">
      <Label className="mb-1.5 block w-fit text-foreground">Output</Label>
      <CodeBlock
        code={JSON.stringify(data, null, 2)}
        lang="json"
        className="block overflow-auto rounded-md bg-secondary-foreground/90 text-xs text-background"
      />
    </div>
  );
}
