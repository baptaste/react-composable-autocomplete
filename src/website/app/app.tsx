import { Footer } from "./components/layout/footer";
import { Layout } from "./components/layout/layout";
import { ThemeToggler } from "./components/theme/theme-toggler";
import { ThemeProvider } from "./components/theme/theme.context";
import { Demo } from "./content/demo/demo";
import { DemoProvider } from "./content/demo/demo.context";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ThemeToggler />
        <DemoProvider>
          <Demo />
        </DemoProvider>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
