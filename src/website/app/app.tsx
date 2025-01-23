import { Footer } from "./components/layout/footer";
import { Layout } from "./components/layout/layout";
import { ThemeToggler } from "./components/theme/theme-toggler";
import { ThemeProvider } from "./components/theme/theme.context";
import { Demo } from "./content/demo/demo";
import { DemoProvider } from "./content/demo/demo.context";
import { fetchTmdbMovies } from "./lib/tmdb-api";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ThemeToggler />
        <DemoProvider fetchDataFn={fetchTmdbMovies}>
          <Demo />
        </DemoProvider>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
