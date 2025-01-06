import { GitHubButton } from "./../github-button";
import { SettingsMenu } from "./../settings/settings-menu";

export function Header() {
  return (
    <header className="sticky left-0 top-0 z-20 -ml-4 -mt-16 flex h-16 w-screen items-center justify-end space-x-2 border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:right-6 md:ml-0">
      <GitHubButton />
      <SettingsMenu />
    </header>
  );
}
