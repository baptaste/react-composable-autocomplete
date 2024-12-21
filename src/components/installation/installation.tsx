import { InstallationCommandCode } from "./installation-command.code";
import { InstallationComponentCode } from "./installation-component.code";
import { InstallationContextCode } from "./installation-context.code";
import { InstallationIntroCode } from "./installation-intro.code";

export function Installation() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-6 text-3xl">Installation</h1>
      <InstallationIntroCode />
      <InstallationCommandCode />
      <InstallationContextCode />
      <InstallationComponentCode />
      <p>That's it!</p>
    </div>
  );
}
