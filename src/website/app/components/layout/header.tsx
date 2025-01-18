import { cn } from "@/packages/core/utils/cn";

import { GitHubButton } from "./../github-button";
import { SettingsMenu } from "./../settings/settings-menu";

export function Header() {
  return (
    <header
      className={cn(
        "sticky left-0 top-0 z-20",
        "h-16 w-screen max-w-[1400px]",
        "flex items-center justify-between space-x-2",
        "-ml-6 -mt-16 px-6",
        "sm:right-6 sm:ml-0 sm:px-12 xl:px-40",
        "border-b border-border/40 bg-background/95",
        "backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <a
        href="/"
        className="px-4 py-2 text-lg font-semibold tracking-tighter text-foreground transition-colors hover:text-muted-foreground"
      >
        /
      </a>
      <div className="flex items-center">
        <GitHubButton />
        <SettingsMenu />
      </div>
    </header>
  );
}
