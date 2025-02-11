import { html } from "@/website/app/lib/html";

import { CodeBlock } from "../../components/code-block";
import {
  InstallationBlock,
  InstallationBlockContent,
  InstallationBlockDescription,
  InstallationBlockTitle,
} from "./installation-block";

export function InstallationPrerequisiteCode() {
  return (
    <InstallationBlock>
      <InstallationBlockTitle>Prerequisite</InstallationBlockTitle>
      <InstallationBlockContent className="mb-0">
        <InstallationBlockDescription>
          The autocomplete is built on top of the shadcn/ui components.{" "}
          The following steps assumes that your project already has the base
          tools/setup (tailwind, cn) and ui components installed.
          <br/>
          Otherwise, you can start by following the{" "}
          <a
            target="_blank"
            href="https://ui.shadcn.com/docs/installation"
            className="text-foreground transition-colors hover:text-muted-foreground"
          >
            official shadcn/ui installation guide{" "}
          </a>
          and adding both{" "}
          <CodeBlock
            lang="tsx"
            code={html`<Button />`}
            className="w-fit [&>.shiki]:!px-2 [&>.shiki]:!py-1 [&>.shiki>pre]:!bg-red-300"
            copy={false}
            singleLine
          />
          {" "}and{" "}
          <CodeBlock
            lang="tsx"
            code={html`<Label />`}
            className="w-fit [&>.shiki]:!p-2 [&>.shiki]:!py-1"
            copy={false}
            singleLine
          />
          {" "}components into your project.
        </InstallationBlockDescription>
      </InstallationBlockContent>
    </InstallationBlock>
  );
}
