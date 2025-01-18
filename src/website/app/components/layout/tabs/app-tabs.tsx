import { Tabs, TabsContent } from "@/packages/core/ui/tabs";
import { Demo } from "@/website/app/content/demo/demo";

import { Installation } from "../../../content/installation/installation";
import { AnimatedTabsList } from "./animated-tabs-list";

export function AppTabs() {
  return (
    <Tabs
      defaultValue="demo"
      className="flex w-full flex-col items-center justify-center"
    >
      <TabsContent
        value="demo"
        className="block w-full data-[state=active]:mb-20 data-[state=active]:mt-0"
      >
        <Demo />
      </TabsContent>
      <TabsContent
        value="install"
        className="block w-full data-[state=active]:mb-20 data-[state=active]:mt-0"
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
