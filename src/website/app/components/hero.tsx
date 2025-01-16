export function Hero() {
  return (
    <div className="my-6 flex w-full flex-col items-center justify-between pt-14">
      <h1 className="mb-2 text-pretty text-center text-4xl font-semibold text-foreground lg:text-5xl">
        <span className="text-secondary-foreground/70">Shadcn Basic</span>{" "}
        Autocomplete
      </h1>
      <p className="w-full text-balance text-center text-secondary-foreground/40 sm:w-2/3">
        Autocomplete compound component for React, built with{" "}
        <a
          target="_blank"
          href="https://ui.shadcn.com/"
          className="text-foreground transition-colors hover:text-secondary-foreground/40"
        >
          shadcn/ui{" "}
        </a>
        and{" "}
        <a
          target="_blank"
          href="https://cmdk.paco.me/"
          className="text-foreground transition-colors hover:text-secondary-foreground/40"
        >
          cmdk
        </a>
        . <br /> Sync or async, built-in loading, error and empty states. Basic,
        flexible, open source.
      </p>
    </div>
  );
}
