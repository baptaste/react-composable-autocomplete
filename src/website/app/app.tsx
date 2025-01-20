import { Footer } from "./components/layout/footer";
import { Layout } from "./components/layout/layout";
import { AppTabs } from "./components/layout/tabs/app-tabs";
import { ThemeToggler } from "./components/theme/theme-toggler";
import { ThemeProvider } from "./components/theme/theme.context";
import { DemoProvider } from "./content/demo/demo.context";
import { fetchTmdbMovies } from "./lib/tmdb-api";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ThemeToggler />
        <DemoProvider fetchDataFn={fetchTmdbMovies}>
          <AppTabs />
        </DemoProvider>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
