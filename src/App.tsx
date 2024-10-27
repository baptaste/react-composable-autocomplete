import { Demo } from "./components/demo";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "./lib/utils/cn";

function App() {
  return (
    <ThemeProvider>
      <div
        className={cn(
          "container flex min-h-dvh w-screen flex-col items-center justify-center bg-background py-10 text-foreground dark:bg-black dark:text-background",
        )}
      >
        <h1 className="mb-16 text-5xl font-extrabold text-foreground">
          Shadcn basic Autocomplete
        </h1>

        <Demo />
      </div>
    </ThemeProvider>
  );
}

export default App;
