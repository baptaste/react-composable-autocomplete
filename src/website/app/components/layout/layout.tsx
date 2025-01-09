import type { ReactNode } from "react";

import { SettingsProvider } from "../settings/settings.context";

export function Layout({ children }: { children: ReactNode }) {
  // lg:px-40 xl:px-60
  return (
    <div className="container relative mx-auto flex min-h-dvh w-screen flex-col bg-background px-4 py-16 text-foreground md:items-center xl:px-20">
      <SettingsProvider>{children}</SettingsProvider>
    </div>
  );
}
