import type { ReactNode } from "react";

export function Hero({ children }: { children?: ReactNode }) {
  return (
    <div className="mb-6 flex w-full flex-col items-center justify-between space-y-8 py-8 sm:mx-auto md:my-10">
      <h1 className="w-full text-center text-[clamp(1.25rem,3cqw,3rem)] font-semibold tracking-tight text-foreground">
        Shadcn Basic Autocomplete
      </h1>
      {children}
    </div>
  );
}
