import type { ReactNode } from "react";

const Hero = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="mb-6 flex w-full flex-col items-center justify-between pt-32 sm:mx-auto md:mb-10 lg:pt-48">
      {children}
    </div>
  );
};

const HeroTitle = () => {
  return (
    <a href="/" className="mb-8">
      <h1 className="w-full text-center text-[clamp(1.9rem,3.5cqw,5rem)] font-bold leading-none tracking-tighter text-foreground">
        Shadcn Basic Autocomplete
      </h1>
    </a>
  );
};

const HeroDescription = () => {
  return (
    <p className="mt-8 w-full text-pretty text-center leading-7 text-muted-foreground sm:w-[500px] sm:text-lg">
      An autocomplete compound component for React. Sync or async, built-in
      loading, error and empty states. Built with{" "}
      <a
        target="_blank"
        href="https://ui.shadcn.com/"
        className="text-foreground transition-colors hover:text-muted-foreground"
      >
        shadcn/ui{" "}
      </a>
      and{" "}
      <a
        target="_blank"
        href="https://cmdk.paco.me/"
        className="text-foreground transition-colors hover:text-muted-foreground"
      >
        cmdk
      </a>
      .
    </p>
  );
};

export { Hero, HeroTitle, HeroDescription };
