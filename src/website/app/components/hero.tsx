import type { ReactNode } from "react";

export function Hero({ children }: { children?: ReactNode }) {
  return (
    <div className="mb-6 flex w-full flex-col items-center justify-between space-y-8 pt-32 sm:mx-auto md:mb-10 lg:pt-48">
      <a href="/">
        <h1 className="w-full text-center text-[clamp(1.9rem,3cqw,3rem)] font-bold leading-none tracking-tighter text-foreground">
          Shadcn Basic Autocomplete
        </h1>
      </a>
      {children}
    </div>
  );
}
