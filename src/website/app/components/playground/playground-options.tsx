import { Button } from "@/packages/core/ui/button";
import { cn } from "@/packages/core/utils/cn";

import {
  useDemo,
  type PlaygroundOption,
} from "../../content/demo/demo.context";

export function PlaygroundOptions() {
  const { playground, updatePlayground } = useDemo();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {Object.entries(playground).map(([option, state]) => (
        <Button
          key={option}
          variant="outline"
          disabled={state === "disabled"}
          className={cn(
            "min-w-20 rounded-full text-xs capitalize",
            state === true && "bg-accent text-accent-foreground",
          )}
          onClick={() => {
            updatePlayground(option as PlaygroundOption, !state);
          }}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
