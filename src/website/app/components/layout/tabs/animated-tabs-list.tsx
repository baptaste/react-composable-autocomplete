import { useRef, useState } from "react";
import { EllipsisIcon } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

import { TabsList, TabsTrigger } from "@/packages/core/ui/tabs";
import { cn } from "@/packages/core/utils/cn";

type AnimatedTabsListProps = {
  defaultValue: string;
  items: Array<{ label: string; value: string }>;
};

export function AnimatedTabsList({
  defaultValue,
  items,
}: AnimatedTabsListProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const expanded = isExpanded.toString();

  useOnClickOutside(triggerRef, () => {
    setIsExpanded(false);
  });

  return (
    <div
      ref={triggerRef}
      data-expanded={expanded}
      role="button"
      className={cn(
        "group z-20 h-10 w-10",
        "fixed bottom-16 left-1/2 right-1/2 -translate-x-1/2",
        "flex items-center justify-center",
        "rounded-md border bg-background shadow",
        "ease transition-[width] delay-300 duration-150",
        "data-[expanded=true]:w-[calc(100vw-32px)] data-[expanded=true]:sm:w-[400px]",
      )}
    >
      <EllipsisIcon
        data-expanded={expanded}
        onClick={() => setIsExpanded(true)}
        className={cn(
          "block h-5 w-5 text-foreground group-hover:text-foreground/50",
          "ease opacity-100 transition-all duration-150",
          "data-[expanded=true]:absolute data-[expanded=true]:-z-10 data-[expanded=true]:opacity-0",
          "data-[expanded=false]:delay-300",
        )}
      />
      <TabsList
        defaultValue={defaultValue}
        data-expanded={expanded}
        className={cn(
          "grid w-full grid-cols-2",
          "absolute -z-10",
          "pointer-events-none opacity-0",
          "ease delay-300 duration-150",
          "data-[expanded=true]:pointer-events-auto data-[expanded=true]:static data-[expanded=true]:z-auto data-[expanded=true]:opacity-100",
        )}
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            data-expanded={expanded}
            className={cn(
              "ease pointer-events-none opacity-0 transition-opacity delay-300 duration-150",
              "data-[expanded=true]:pointer-events-auto data-[expanded=true]:opacity-100",
              "aria-selected:!bg-foreground aria-selected:!text-background",
              "dark:aria-selected:!bg-background dark:aria-selected:!text-foreground",
            )}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
