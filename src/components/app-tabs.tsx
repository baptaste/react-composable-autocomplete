import { Tabs, TabsContent } from "../components/ui/tabs";
import { AnimatedTabsList } from "./animated-tabs-list";
import { Demo } from "./demo";
import { ExampleUsageCode } from "./example-usage.code";
import { Installation } from "./installation/installation";

export function AppTabs() {
  return (
    <Tabs
      defaultValue="demo"
      className="flex w-full flex-col items-center justify-center"
    >
      <TabsContent value="demo" className="block w-full">
        <Demo />
      </TabsContent>
      <TabsContent
        value="usage"
        className="block w-full data-[state=active]:mb-20"
      >
        <ExampleUsageCode />
      </TabsContent>
      <TabsContent
        value="install"
        className="block w-full data-[state=active]:mb-20"
      >
        <Installation />
      </TabsContent>

      <AnimatedTabsList
        defaultValue="demo"
        items={[
          {
            label: "Demo",
            value: "demo",
          },
          {
            label: "Usage",
            value: "usage",
          },
          {
            label: "Install",
            value: "install",
          },
        ]}
      />
    </Tabs>
  );
}
