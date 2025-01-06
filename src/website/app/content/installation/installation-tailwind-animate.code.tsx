import { html } from "@/website/app/lib/html";

import { CodeBlock } from "../../components/code-block";
import {
  InstallationBlock,
  InstallationBlockContent,
  InstallationBlockDescription,
  InstallationBlockTitle
} from "./installation-block";

export function InstallationTailwindAnimateCode() {
  return (
    <InstallationBlock>
      <InstallationBlockTitle>Tailwind Animate Plugin</InstallationBlockTitle>
      <InstallationBlockContent className="inline-flex items-center gap-x-1">
        <InstallationBlockDescription>
          The Autocomplete component uses some animations of the{" "}
          <a
            target="_blank"
            href="https://github.com/jamiebuilds/tailwindcss-animate"
            className="text-foreground transition-colors hover:text-secondary-foreground/40"
          >
            tailwindcss-animate plugin
          </a>
          .
          <br /> You can install it by running the following command:
        </InstallationBlockDescription>
      </InstallationBlockContent>
      <CodeBlock
        lang="bash"
        code={html`npm install -D tailwindcss-animate`}
        className="md:min-w-[400px] w-full"
        lineNumbers={false}
        singleLine
      />
      <InstallationBlockContent className="mt-4 inline-flex items-center gap-x-1">
        <InstallationBlockDescription>
          Then add the plugin to your <u>tailwind.config.js</u> file:
        </InstallationBlockDescription>
      </InstallationBlockContent>
      <CodeBlock lang="js" code={tailwindConfigCode} />
    </InstallationBlock>
  );
}

const tailwindConfigCode =
html`  import tailwindAnimate from "tailwindcss-animate";

  /** @type {import('tailwindcss').Config} */
  export default {
    // rest of your config...
    plugins: [tailwindAnimate],
  }
`

