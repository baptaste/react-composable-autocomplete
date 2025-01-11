import { OutputBlock } from "../../components/output-block";
import { useSettings } from "../../components/settings/settings.context";
import { fetchPosts } from "../../lib/posts-api";
import { ExampleUsageCode } from "../example-usage/example-usage.code";
import { Playground } from "../playground/playground";
import { DemoProvider } from "./demo.context";

export function Demo() {
  const { playground } = useSettings();

  return (
    <DemoProvider fetchDataFn={fetchPosts}>
      <div className="flex w-full flex-col items-center">
        <Playground />
        <div className="flex w-full flex-col justify-center gap-6 md:flex-row-reverse md:pt-12">
          {playground.output && <OutputBlock />}
          <ExampleUsageCode />
        </div>
      </div>
    </DemoProvider>
  );
}
