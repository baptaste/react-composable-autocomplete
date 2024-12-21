import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import { Button } from "../ui/button";
import { useClipboardCopy } from "./use-clipboard-copy";

type ClipboardCopyProps = {
  value?: string | unknown;
  className?: string;
  iconClassName?: string;
};

export function ClipboardCopy({
  value,
  className,
  iconClassName,
}: ClipboardCopyProps) {
  const { copied, copy } = useClipboardCopy();

  const handleClick = () => {
    if (typeof value === "string") {
      copy(value);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn("bg-background/80 px-3 py-1.5 text-foreground", className)}
      variant="ghost"
    >
      {copied ? (
        <CheckIcon className={cn("h-4 w-4", iconClassName)} />
      ) : (
        <CopyIcon className={cn("h-4 w-4", iconClassName)} />
      )}
    </Button>
  );
}
