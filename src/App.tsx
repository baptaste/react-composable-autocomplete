import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Demo } from "./components/demo";
import { Hero } from "./components/hero";
import { Settings } from "./components/settings";
import { SettingsProvider } from "./components/settings-provider";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils/cn";

function App() {
  return (
    <SettingsProvider>
      <div
        className={cn(
          "container mx-auto flex min-h-dvh w-screen flex-col bg-background px-4 py-16 text-foreground md:items-center md:justify-center",
        )}
      >
        <header>
          <Hero />
        </header>
        <aside className="absolute right-4 top-6 flex items-center space-x-2 md:right-6">
          <Button asChild variant="ghost" className="p-2">
            <a
              target="_blank"
              href="https://github.com/baptaste/shadcn-ui-autocomplete"
            >
              <GitHubLogoIcon className="mr-2 h-5 w-5 text-foreground" />
              <span className="hidden md:block">GitHub</span>
            </a>
          </Button>
          <Settings />
        </aside>
        <main className="block w-full lg:px-40 xl:px-60">
          <Demo />
        </main>
      </div>
    </SettingsProvider>
  );
}

export default App;
