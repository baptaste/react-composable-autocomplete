import { Hero } from "./components/hero";
import { Header } from "./components/layout/header";
import { Layout } from "./components/layout/layout";
import { AppTabs } from "./components/layout/tabs/app-tabs";

function App() {
  return (
    <Layout>
      <Header />
      <div className="flex w-full flex-col md:pt-24">
        <Hero />
        <AppTabs />
      </div>
    </Layout>
  );
}

export default App;
