import type { ReactNode } from "react";

import { cn } from "@/packages/core/utils/cn";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "container relative mx-auto",
        "flex flex-col gap-y-12 md:items-center",
        "min-h-dvh w-screen",
        "bg-background text-foreground",
        "px-6 pb-20",
        "sm:px-12",
        "xl:px-60",
      )}
    >
      {children}
    </div>
  );
}
