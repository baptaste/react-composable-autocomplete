import type { ReactNode } from "react";

const Hero = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      id="hero"
      className="flex w-full flex-col items-center justify-between space-y-8 pb-6 pt-36 sm:mx-auto md:pb-10 lg:pt-28"
    >
      {children}
    </div>
  );
};

const HeroTitle = () => {
  return (
    <a href="/">
      <h1 className="w-full text-center text-[clamp(1.9rem,3cqw,5rem)] font-bold leading-none tracking-tighter text-foreground">
        React Composable Autocomplete
      </h1>
    </a>
  );
};

const HeroDescription = () => {
  return (
    <p className="w-full text-pretty text-center leading-7 text-muted-foreground sm:w-[450px] sm:text-lg">
      A composable autocomplete component for React. Sync or async, built-in
      loading, error and empty states. Customizable, accessible, open source.
    </p>
  );
};

export { Hero, HeroTitle, HeroDescription };
