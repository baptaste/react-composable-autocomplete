import type { AutocompleteOption } from "./autocomplete/autocomplete.context";
import { CodeExample } from "./code-example";
import { Label } from "./ui/label";

export function OutputBlock({ data }: { data: AutocompleteOption[] }) {
  return (
    <div className="flex w-full min-w-max flex-col items-center overflow-y-scroll md:w-[400px]">
      <Label className="mb-1.5 block w-fit self-start text-foreground">
        Output
      </Label>
      <CodeExample
        lang="json"
        example={JSON.stringify(data, null, 2)}
        copy={false}
        className="max-h-[248px] md:min-w-[400px]"
      />
    </div>
  );
}
