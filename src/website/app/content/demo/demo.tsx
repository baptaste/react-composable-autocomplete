import { cn } from "@/packages/core/utils/cn";

import { Hero, HeroDescription, HeroTitle } from "../../components/hero";
import { AsyncPlayground } from "../../components/playground/async-playground";
import { PlaygroundOptions } from "../../components/playground/playground-options";
import { SyncPlayground } from "../../components/playground/sync-playground";
import { AsyncUsageCode } from "../../components/usage/async-usage.code";
import { SyncUsageCode } from "../../components/usage/sync-usage.code";
import { useDemo } from "./demo.context";

export function Demo() {
  const { playground } = useDemo();

  return (
    <div className="flex w-full flex-col gap-y-8">
      <Hero>
        <HeroTitle />
        {playground.async === true && <AsyncPlayground />}
        {playground.async === false && <SyncPlayground />}
        <HeroDescription />
        <PlaygroundOptions />
      </Hero>
      <div className={cn("block", playground.async === false && "hidden")}>
        <AsyncUsageCode />
      </div>
      <div className={cn("block", playground.async === true && "hidden")}>
        <SyncUsageCode />
      </div>
    </div>
  );
}
