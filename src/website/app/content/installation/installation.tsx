import { InstallationClickOutsideHookCode } from "./installation-click-outside-hook.code";
import { InstallationCommandCode } from "./installation-command.code";
import { InstallationComponentCode } from "./installation-component.code";
import { InstallationContextCode } from "./installation-context.code";
import { InstallationPrerequisiteCode } from "./installation-prerequisite.code";
import { InstallationTailwindAnimateCode } from "./installation-tailwind-animate.code";

export function Installation() {
  return (
    <div className="mt-12 flex w-full flex-col">
      <h1 className="mb-10 border-b pb-2 text-3xl">Installation</h1>
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
