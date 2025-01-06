import { useCallback, useEffect, useState } from "react";
import { createHighlighter } from "shiki";

import { cn } from "@/packages/core/utils/cn";

import { ClipboardCopy } from "./clipboard-copy/clipboard-copy";

type Lang = "tsx" | "js" | "json" | "bash" | "html";

type CodeBlockProps = {
  code: string;
  lang: Lang;
  copy?: boolean;
  className?: string;
  lineNumbers?: boolean;
  singleLine?: boolean;
};

const THEME = "github-dark-default";

export function CodeBlock({
  code,
  lang,
  className,
  copy = true,
  lineNumbers = true,
  singleLine = false,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");

  const getHighlightedHtmlCodeString = useCallback(async () => {
    const highlighter = await createHighlighter({
      themes: [THEME],
      langs: [lang],
    });

    return highlighter.codeToHtml(code, {
      lang,
      theme: THEME,
    });
  }, [code, lang]);

  useEffect(() => {
    getHighlightedHtmlCodeString().then(setHtml);
  }, [getHighlightedHtmlCodeString]);

  return (
    <div className={cn("relative inline-flex", !singleLine && "w-full")}>
      {copy && (
        <ClipboardCopy
          value={code}
          className={cn(
            "absolute right-4 top-2 z-10",
            singleLine && "top-1/2 -translate-y-1/2",
          )}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={cn(
          "max-h-[600px] w-full overflow-y-scroll rounded-md bg-secondary",
          "[&>.shiki>pre]:!min-w-0 [&>.shiki]:!w-full [&>.shiki]:!overflow-x-auto [&>.shiki]:!rounded-md [&>.shiki]:!p-3 [&>.shiki]:!text-sm [&>.shiki]:!leading-4",

          lineNumbers && "[&>.shiki>code]:[counter-reset:line-number]",
          lineNumbers &&
            "[&>.shiki>code>.line]:[counter-increment:line-number]",
          lineNumbers &&
            "[&>.shiki>code>.line]:before:content-[counter(line-number)]",

          "[&>.shiki>code>.line]:before:mr-2 [&>.shiki>code>.line]:before:font-mono [&>.shiki>code>.line]:before:text-xs [&>.shiki>code>.line]:before:text-muted-foreground",

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
