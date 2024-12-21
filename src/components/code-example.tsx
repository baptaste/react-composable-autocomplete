import { useCallback, useEffect, useState } from "react";
import { createHighlighter } from "shiki";

import { cn } from "@/lib/utils/cn";

import { ClipboardCopy } from "./clipboard-copy/clipboard-copy";

type Lang = "tsx" | "json" | "bash" | "html";

type CodeExampleProps = {
  example: string;
  lang: Lang;
  copy?: boolean;
  className?: string;
  singleLine?: boolean;
};

const THEME = "github-dark-default";

export function CodeExample({
  example,
  lang,
  copy = true,
  className,
  singleLine = false,
}: CodeExampleProps) {
  const [html, setHtml] = useState<string>("");

  const getHighlightedHtmlCodeString = useCallback(async () => {
    const highlighter = await createHighlighter({
      themes: [THEME],
      langs: [lang],
    });

    return highlighter.codeToHtml(example, {
      lang,
      theme: THEME,
    });
  }, [example, lang]);

  useEffect(() => {
    getHighlightedHtmlCodeString().then(setHtml);
  }, [getHighlightedHtmlCodeString]);

  return (
    <div className={cn("relative inline-flex", !singleLine && "w-full")}>
      {copy && (
        <ClipboardCopy
          value={example}
          className="absolute right-4 top-4 z-10"
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={cn(
          "max-h-[600px] w-full overflow-y-scroll rounded-md bg-secondary",
          "[&>.shiki>pre]:!min-w-0 [&>.shiki]:!w-full [&>.shiki]:!overflow-x-auto [&>.shiki]:!rounded-md [&>.shiki]:!p-3 [&>.shiki]:!text-sm [&>.shiki]:!leading-4",

          "[&>.shiki>code]:[counter-reset:line-number]",
          "[&>.shiki>code>.line]:[counter-increment:line-number]",
          "[&>.shiki>code>.line]:before:content-[counter(line-number)]",

          "[&>.shiki>code>.line]:before:mr-2",
          "[&>.shiki>code>.line]:before:font-mono",
          "[&>.shiki>code>.line]:before:text-xs",
          "[&>.shiki>code>.line]:before:text-muted-foreground",

          "[&>.shiki>code>.line]:inline-block",
          "[&>.shiki>code>.line]:py-0.5",

          // One line
          "[&>.shiki>code>.line:only-of-type]:before:hidden",

          className,
        )}
      />
    </div>
  );
}
