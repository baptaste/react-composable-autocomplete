import { useMemo } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/packages/core/ui/button";
import { cn } from "@/packages/core/utils/cn";

import { useClipboardCopy } from "./use-clipboard-copy";

type ClipboardCopyProps = {
  value: string;
  className?: string;
};

export function ClipboardCopy({ value, className }: ClipboardCopyProps) {
  const { copied, copy } = useClipboardCopy();

  const Icon = useMemo(() => (copied ? CheckIcon : CopyIcon), [copied]);

  return (
    <Button
      variant="ghost"
      onClick={() => copy(value)}
      className={cn(
        "group h-fit bg-foreground/70 p-2 dark:bg-background/70",
        className,
      )}
    >
      <Icon className="h-4 w-4 text-background transition-colors group-hover:text-foreground dark:text-foreground" />
    </Button>
  );
}
