import type { AutocompleteOption } from "../../../components/autocomplete/autocomplete.context";
import { CodeBlock } from "./code-block";

export function OutputBlock({ data }: { data: AutocompleteOption[] }) {
  return (
    <div className="flex w-full flex-col gap-y-4 overflow-y-scroll md:min-w-max">
      <h1 className="text-xl">Output</h1>
      <CodeBlock
        lang="json"
        code={JSON.stringify(data, null, 2)}
        copy={false}
        className="max-h-[248px] md:min-w-[400px]"
      />
    </div>
  );
}
