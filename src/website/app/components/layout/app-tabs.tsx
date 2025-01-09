import { Tabs, TabsContent } from "@/packages/core/ui/tabs";

import { ExampleUsageCode } from "../../content/example-usage/example-usage.code";
import { Installation } from "../../content/installation/installation";
import { Playground } from "../../content/playground/playground";
import { AnimatedTabsList } from "./tabs/animated-tabs-list";

export function AppTabs() {
  return (
    <Tabs
      defaultValue="demo"
      className="mt-6 flex w-full flex-col items-center justify-center"
    >
      <TabsContent
        value="demo"
        className="block w-full data-[state=active]:mb-20"
      >
        <Playground />
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
          { label: "Demo", value: "demo" },
          { label: "Installation", value: "install" },
        ]}
      />
    </Tabs>
  );
}
