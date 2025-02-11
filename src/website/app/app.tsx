import { Footer } from "./components/layout/footer";
import { Layout } from "./components/layout/layout";
import { ThemeToggler } from "./components/theme/theme-toggler";
import { ThemeProvider } from "./components/theme/theme.context";
import { Demo } from "./content/demo/demo";
import { DemoProvider } from "./content/demo/demo.context";
import { Installation } from "./content/installation/installation";
import { PropsBlock } from "./content/props/props-block";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ThemeToggler />
        <DemoProvider>
          <Demo />
        </DemoProvider>
        <PropsBlock />
        <Installation />
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
