import { Button } from "@/packages/core/ui/button";
import { cn } from "@/packages/core/utils/cn";

import { AutocompletePlayground } from "../../components/autocomplete-playground";
import { Description } from "../../components/description";
import { ExampleUsageCode } from "../../components/example-usage.code";
import { Hero } from "../../components/hero";
import { OutputBlock } from "../../components/output-block";
import { useDemo, type PlaygroundOption } from "./demo.context";

export function Demo() {
  const { isError, isLoading, isEmpty, showOutput, updatePlayground } =
    useDemo();

  const playgroundState = {
    output: showOutput,
    error: isError,
    loading: isLoading,
    empty: isEmpty,
  };

  return (
    <div className="flex w-full flex-col gap-y-8">
      <Hero>
        <AutocompletePlayground />
        <Description />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {Object.entries(playgroundState).map(([option, active]) => (
            <Button
              key={option}
              variant={active ? "default" : "outline"}
              className={cn("h-6 min-w-10 rounded-3xl px-2 text-xs capitalize")}
              onClick={() => {
                updatePlayground(option as PlaygroundOption, !active);
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      </Hero>
      <div className="flex w-full flex-col justify-center gap-6 md:mx-auto md:w-2/3">
        {showOutput && <OutputBlock />}
        <ExampleUsageCode />
      </div>
    </div>
  );
}
