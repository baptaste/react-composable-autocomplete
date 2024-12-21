import { AppLayout } from "./components/app-layout";
import { AppTabs } from "./components/app-tabs";
import { GitHubButton } from "./components/github-button";
import { Hero } from "./components/hero";
import { SettingsMenu } from "./components/settings/settings-menu";

function App() {
  return (
    <AppLayout>
      <aside className="absolute right-4 top-6 flex items-center space-x-2 md:right-6">
        <GitHubButton />
        <SettingsMenu />
      </aside>
      <Hero />
      <AppTabs />
    </AppLayout>
  );
}

export default App;
