export function Hero() {
  return (
    <header className="my-6 flex w-full flex-col items-center justify-between">
      <h1 className="mb-2 text-pretty text-4xl font-semibold text-foreground lg:text-5xl">
        Shadcn Autocomplete
      </h1>
      <p className="text-balance text-secondary-foreground/40">
        The missing{" "}
        <a
          target="_blank"
          href="https://ui.shadcn.com/"
          className="text-foreground transition-colors hover:text-secondary-foreground/40"
        >
          shadcn/ui
        </a>{" "}
        basic autocomplete component.
      </p>
    </header>
  );
  return (
    <div className="my-10 flex flex-col md:items-center lg:mt-0">
      <h1 className="mb-2 text-4xl font-extrabold text-foreground lg:text-5xl">
        Shadcn Autocomplete
      </h1>
      <p className="text-pretty text-secondary-foreground/40">
        The missing{" "}
        <a
          target="_blank"
          href="https://ui.shadcn.com/"
          className="text-foreground transition-colors hover:text-secondary-foreground/40"
        >
          shadcn/ui
        </a>{" "}
        basic autocomplete component.
      </p>
    </div>
  );
}
