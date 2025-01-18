import { Header } from "./components/layout/header";
import { Layout } from "./components/layout/layout";
import { AppTabs } from "./components/layout/tabs/app-tabs";
import { SettingsProvider } from "./components/settings/settings.context";
import { DemoProvider } from "./content/demo/demo.context";
import { fetchTmdbMovies } from "./lib/tmdb-api";

function App() {
  return (
    <SettingsProvider>
      <Layout>
        <Header />
        <DemoProvider fetchDataFn={fetchTmdbMovies}>
          <AppTabs />
        </DemoProvider>
      </Layout>
    </SettingsProvider>
  );
}

export default App;
