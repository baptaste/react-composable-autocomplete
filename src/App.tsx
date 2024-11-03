import { useRef } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Demo } from "./components/demo";
import { Hero } from "./components/hero";
import { Installation } from "./components/installation";
import { Settings } from "./components/settings";
import { SettingsProvider } from "./components/settings-provider";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils/cn";

function App() {
  const installRef = useRef<HTMLDivElement>(null);

  return (
    <SettingsProvider>
      <div
        className={cn(
          "container mx-auto flex min-h-dvh w-screen flex-col bg-background px-4 text-foreground md:items-center md:justify-center lg:px-40 xl:px-60",
        )}
      >
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

        <header className="flex h-[100dvh] w-full flex-col items-center justify-between py-16">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Hero />
            <Demo />
          </div>
          <Button
            className="duration-[5s] w-48 animate-pulse font-medium"
            variant="default"
            onClick={() => {
              if (installRef.current) {
                installRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Install
          </Button>
        </header>

        <main ref={installRef} className="block w-full">
          <Installation />
        </main>
      </div>
    </SettingsProvider>
  );
}

export default App;
