import { Button } from "@/packages/core/ui/button";
import { cn } from "@/packages/core/utils/cn";

import { AutocompletePlayground } from "../../components/autocomplete-playground/autocomplete-playground";
import { Description } from "../../components/description";
import { ExampleUsageCode } from "../../components/example-usage/example-usage.code";
import { Hero } from "../../components/hero";
import { OutputBlock } from "../../components/output-block";
import {
  PlaygroundKey,
  useSettings,
} from "../../components/settings/settings.context";

export function Demo() {
  const { playground, setPlayground } = useSettings();

  return (
    <div className="flex w-full flex-col md:pt-24">
      <Hero>
        <AutocompletePlayground />
        <Description />
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-4 md:pt-8">
          {Object.entries(playground).map(([key, active]) => (
            <Button
              key={key}
              variant={active ? "default" : "outline"}
              className={cn("min-w-10 rounded-3xl capitalize")}
              onClick={() => {
                setPlayground(key as PlaygroundKey, !active);
              }}
            >
              {key}
            </Button>
          ))}
        </div>
      </Hero>
      <div className="flex w-full flex-col justify-center gap-6 md:flex-row-reverse">
        {playground.output && <OutputBlock />}
        <ExampleUsageCode className={cn(!playground.output && "md:w-2/3")} />
      </div>
    </div>
  );
}
