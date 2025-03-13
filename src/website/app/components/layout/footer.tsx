export function Footer() {
  return (
    <footer className="flex items-center justify-center">
      <p className="text-pretty text-sm text-muted-foreground">
        Built by{" "}
        <a target="_blank" href="https://x.com/baptaste" className="underline">
          baptaste
        </a>
        . Inspired by{" "}
        <a target="_blank" href="https://ui.shadcn.com/" className="underline">
          shadcn/ui
        </a>
        . Source code on{" "}
        <a
          target="_blank"
          href="https://github.com/baptaste/react-composable-autocomplete"
          className="underline"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
