import { html } from "@/website/app/lib/html";

import { CodeBlock } from "../../components/code-block";
import {
  InstallationBlock,
  InstallationBlockContent,
  InstallationBlockDescription,
  InstallationBlockTitle
} from "./installation-block";

export function InstallationCommandCode() {
  return (
    <InstallationBlock>
      <InstallationBlockTitle>Command</InstallationBlockTitle>
      <InstallationBlockContent className="inline-flex items-center gap-x-1">
        <InstallationBlockDescription>
          The Autocomplete component is built on top of the shadcn's version{" "}
        <CodeBlock
          lang="tsx"
          code={html`<Command />`}
          className="w-fit [&>.shiki]:!p-2 [&>.shiki]:!py-1"
          copy={false}
          singleLine
        />
        {" "}component.
        <br />
        If it's not already in your project, you can follow the cmdk's{" "}
        <a
          target="_blank"
          href="https://ui.shadcn.com/docs/components/command"
          className="text-foreground transition-colors hover:text-secondary-foreground/40"
        >
          installation guide
        </a>
        .
        <br /><br />
        Then, replace{" "}
        <CodeBlock
          lang="tsx"
          code={html`<CommandItem />`}
          className="w-fit [&>.shiki]:!p-2 [&>.shiki]:!py-1"
          copy={false}
          singleLine
        />
        {" "}className with the following:
        </InstallationBlockDescription>
      </InstallationBlockContent>
      <CodeBlock
          lang="html"
          code={
            html`  relative flex items-center px-2 py-1.5
  cursor-default text-sm rounded-sm
  select-none outline-none
  data-[disabled=true]:pointer-events-none
  data-[disabled=true]:opacity-50
  data-[selected=true]:bg-accent
  data-[selected=true]:text-accent-foreground`
          }
          className="md:min-w-[400px] w-full"
          lineNumbers={false}
        />
    </InstallationBlock>
  );
}


