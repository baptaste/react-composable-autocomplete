import { html } from "@/website/app/lib/html";

import { CodeBlock } from "../../components/code-block";
import {
  InstallationBlock,
  InstallationBlockContent,
  InstallationBlockDescription,
  InstallationBlockTitle
} from "./installation-block";

export function InstallationClickOutsideHookCode() {
  return (
    <InstallationBlock>
      <InstallationBlockTitle>usehooks-ts</InstallationBlockTitle>
      <InstallationBlockContent className="inline-flex items-center gap-x-1">
        <InstallationBlockDescription>
          The Autocomplete component uses the <u>useOnClickOutside</u> hook from{" "}
          <a
            target="_blank"
            href="https://usehooks-ts.com/react-hook/use-on-click-outside"
            className="text-foreground transition-colors hover:text-muted-foreground"
          >
            usehooks-ts
          </a>
          {" "}to handle its open state.
          <br /> You can install it by running the following command:
        </InstallationBlockDescription>
      </InstallationBlockContent>
      <CodeBlock
        lang="bash"
        code={html`npm install usehooks-ts`}
        className="md:min-w-[400px] w-full"
        lineNumbers={false}
        singleLine
      />
    </InstallationBlock>
  );
}

