import { cn } from "@/packages/core/utils/cn";

import { CodeBlock } from "../../components/code-block";
import { AsyncExampleUsageCode } from "../../components/example-usage/async-example-usage.code";
import { SyncExampleUsageCode } from "../../components/example-usage/sync-example-usage.code";
import { Hero, HeroDescription, HeroTitle } from "../../components/hero";
import { AsyncPlayground } from "../../components/playground/async-playground";
import { PlaygroundOptions } from "../../components/playground/playground-options";
import { SyncPlayground } from "../../components/playground/sync-playground";
import { useDemo } from "./demo.context";

export function Demo() {
  const { data, playground } = useDemo();

  return (
    <div className="flex w-full flex-col gap-y-8">
      <Hero>
        <HeroTitle />

        <div
          className={cn(
            "flex w-full justify-center",
            !playground.async && "hidden",
          )}
        >
          <AsyncPlayground />
        </div>
        <div
          className={cn(
            "flex w-full justify-center",
            playground.async && "hidden",
          )}
        >
          <SyncPlayground />
        </div>

        {playground.output && (
          <div className="!mt-4 min-h-11 w-full md:w-auto">
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
          </div>
        )}

        <HeroDescription />

        <PlaygroundOptions />
      </Hero>

      <div className={cn("block", !playground.async && "hidden")}>
        <AsyncExampleUsageCode />
      </div>
      <div className={cn("block", playground.async && "hidden")}>
        <SyncExampleUsageCode />
      </div>
    </div>
  );
}
