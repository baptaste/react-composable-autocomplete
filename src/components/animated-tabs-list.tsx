import { useCallback, useRef, useState } from "react";
import { EllipsisIcon } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

import { cn } from "@/lib/utils/cn";

import { TabsList, TabsTrigger } from "./ui/tabs";

export function AnimatedTabsList({
  defaultValue,
  items,
}: {
  defaultValue: string;
  items: Array<{ label: string; value: string }>;
}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const expanded = isExpanded.toString();

  const handleExpand = useCallback((expand: boolean) => {
    setIsExpanded(expand);
  }, []);

  useOnClickOutside(triggerRef, () => {
    handleExpand(false);
  });

  return (
    <div
      ref={triggerRef}
      role="button"
      data-expanded={expanded}
      onClick={() => handleExpand(true)}
      className={cn(
        "group relative h-10 w-10 rounded-md border",
        "flex items-center justify-center",
        "fixed bottom-10 left-1/2 right-1/2",
        "-translate-x-1/2",
        "bg-background",
        "ease transition-[width] delay-300 duration-150",
        "data-[expanded=true]:w-[calc(100vw-32px)] data-[expanded=true]:sm:w-[400px]",
      )}
    >
      <EllipsisIcon
        data-expanded={expanded}
        className={cn(
          "ease block text-foreground opacity-100 transition-all duration-150 group-hover:text-foreground/50",
          "data-[expanded=true]:absolute data-[expanded=true]:-z-10 data-[expanded=true]:opacity-0",
        )}
      />

      <TabsList
        defaultValue={defaultValue}
        data-expanded={expanded}
        className={cn(
          "w-full",
          "grid grid-cols-3",
          "opacity-0",
          "absolute -z-10",
          "ease delay-300 duration-150",
          "pointer-events-none",
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
            )}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
