export function Hero() {
  return (
    <div className="my-6 flex w-full flex-col items-center justify-between">
      <h1 className="mb-2 text-pretty text-4xl font-semibold text-foreground lg:text-5xl">
        Shadcn Autocomplete
      </h1>
      <p className="text-pretty text-secondary-foreground/40 sm:w-2/3 sm:text-center">
        A basic React autocomplete component inspired by{" "}
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
        .
      </p>
    </div>
  );
}
