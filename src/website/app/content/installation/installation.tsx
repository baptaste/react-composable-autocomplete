import { Hero } from "../../components/hero";
import { InstallationClickOutsideHookCode } from "./installation-click-outside-hook.code";
import { InstallationCommandCode } from "./installation-command.code";
import { InstallationComponentCode } from "./installation-component.code";
import { InstallationContextCode } from "./installation-context.code";
import { InstallationPrerequisiteCode } from "./installation-prerequisite.code";
import { InstallationTailwindAnimateCode } from "./installation-tailwind-animate.code";

export function Installation() {
  return (
    <div className="flex w-full flex-col md:pt-24">
      <Hero>
        <h1 className="text-3xl">Installation</h1>
      </Hero>
      <InstallationPrerequisiteCode />
      <InstallationTailwindAnimateCode />
      <InstallationClickOutsideHookCode />
      <InstallationCommandCode />
      <InstallationContextCode />
      <InstallationComponentCode />
      <p>That's it!</p>
    </div>
  );
}
