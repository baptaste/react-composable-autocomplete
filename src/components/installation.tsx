import { autocompleteCodeString } from "@/lib/utils/autocomplete-code-string";

import { CodeBlock } from "./code-block";

export function Installation() {
  return (
    <div className="mt-10 flex flex-col gap-y-6">
      <h1 className="text-3xl">Installation</h1>
      <p>To install the component, copy and paste the following code:</p>
      <CodeBlock code={autocompleteCodeString} />
    </div>
  );
}
