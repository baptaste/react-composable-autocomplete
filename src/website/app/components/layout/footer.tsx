export function Footer() {
  return (
    <footer className="mt-20 flex items-center justify-center">
      <p className="text-pretty text-sm text-muted-foreground">
        Built by{" "}
        <a
          target="_blank"
          href="https://x.com/baptaste"
          className="text-foreground underline transition-colors hover:text-muted-foreground"
        >
          baptaste
        </a>
        . Source code on{" "}
        <a
          target="_blank"
          href="https://github.com/baptaste/shadcn-basic-autocomplete"
          className="text-foreground underline transition-colors hover:text-muted-foreground"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
