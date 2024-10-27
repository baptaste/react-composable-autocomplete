export function Hero() {
  return (
    <div className="my-10 flex flex-col md:items-center lg:mt-0">
      <h1 className="mb-2 text-4xl font-extrabold text-foreground lg:text-5xl">
        Shadcn Autocomplete
      </h1>
      <p className="text-pretty text-secondary-foreground/40 transition-colors">
        The missing{" "}
        <a
          target="_blank"
          href="https://ui.shadcn.com/"
          className="text-foreground hover:text-secondary-foreground/40"
        >
          shadcn/ui
        </a>{" "}
        basic autocomplete component.
      </p>
    </div>
  );
}
