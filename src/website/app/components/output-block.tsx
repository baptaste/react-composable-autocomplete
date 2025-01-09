import { useDemo } from "../content/demo/demo.context";
import { CodeBlock } from "./code-block";

export function OutputBlock() {
  const { data } = useDemo();

  return (
    <div className="flex w-full flex-col gap-y-4 overflow-y-scroll md:w-1/2">
      <h4 className="text-xl">Output</h4>
      <CodeBlock
        lang="json"
        code={JSON.stringify(data, null, 2)}
        className="md:h-[434px] md:min-w-[400px]"
        lineNumbers={false}
        copy={false}
      />
    </div>
  );
}
