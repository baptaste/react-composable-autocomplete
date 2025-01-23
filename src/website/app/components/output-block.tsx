import { AutocompleteItemShape } from "@/packages/core/autocomplete/autocomplete.context";
import { cn } from "@/packages/core/utils/cn";

import { CodeBlock } from "./code-block";

export function OutputBlock({ data }: { data: Array<AutocompleteItemShape> }) {
  return (
    <CodeBlock
      lang="json"
      code={JSON.stringify(data, null, 2)}
      className={cn(
        "max-h-[200px] md:min-w-[350px] md:max-w-[600px]",
        data.length > 0 && "w-[600px]",
      )}
      lineNumbers={false}
      copy={false}
    />
  );
}
