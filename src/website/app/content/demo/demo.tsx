import { Button } from "@/packages/core/ui/button";
import { cn } from "@/packages/core/utils/cn";

import { AsyncExampleUsageCode } from "../../components/example-usage/async-example-usage.code";
import { SyncExampleUsageCode } from "../../components/example-usage/sync-example-usage.code";
import { Hero, HeroDescription, HeroTitle } from "../../components/hero";
import { OutputBlock } from "../../components/output-block";
import { AsyncPlayground } from "../../components/playground/async-playground";
import { SyncPlayground } from "../../components/playground/sync-playground";
import { Installation } from "../installation/installation";
import { useDemo, type PlaygroundOption } from "./demo.context";

export function Demo() {
  const {
    data,
    isError,
    isLoading,
    isEmpty,
    showOutput,
    asyncMode,
    updatePlayground,
  } = useDemo();

  const playgroundState = asyncMode
    ? {
        output: showOutput,
        async: true,
        error: isError,
        loading: isLoading,
        empty: isEmpty,
      }
    : {
        output: showOutput,
        async: false,
        empty: isEmpty,
      };

  return (
    <div className="flex w-full flex-col gap-y-8">
      <Hero>
        <HeroTitle />

        <div
          className={cn("flex w-full justify-center", !asyncMode && "hidden")}
        >
          <AsyncPlayground />
        </div>
        <div
          className={cn("flex w-full justify-center", asyncMode && "hidden")}
        >
          <SyncPlayground />
        </div>

        {showOutput && (
          <div className="mt-8 min-h-11 w-full md:w-auto">
            <OutputBlock data={data} />
          </div>
        )}

        <HeroDescription />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {Object.entries(playgroundState).map(([option, active]) => (
            <Button
              key={option}
              variant={active ? "default" : "outline"}
              className={cn("min-w-20 rounded-full text-xs capitalize")}
              onClick={() => {
                updatePlayground(option as PlaygroundOption, !active);
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      </Hero>

      <div className={cn("block", !asyncMode && "hidden")}>
        <AsyncExampleUsageCode />
      </div>
      <div className={cn("block", asyncMode && "hidden")}>
        <SyncExampleUsageCode />
      </div>

      <Installation />
    </div>
  );
}
