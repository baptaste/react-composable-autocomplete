export function Description() {
  return (
    <p className="w-full text-pretty text-center text-base text-muted-foreground sm:w-2/3 sm:text-lg">
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
}
