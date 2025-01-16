import { useEffect, useState } from "react";

import { cn } from "@/packages/core/utils/cn";

import {
  getHighlightedHtmlCodeString,
  type CodeHighlightLang,
} from "../lib/code";
import { ClipboardCopy } from "./clipboard-copy/clipboard-copy";

type CodeBlockProps = {
  code: string;
  lang: CodeHighlightLang;
  copy?: boolean;
  className?: string;
  lineNumbers?: boolean;
  singleLine?: boolean;
};

export function CodeBlock({
  code,
  lang,
  className,
  copy = true,
  lineNumbers = true,
  singleLine = false,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const { highlighter, html } = await getHighlightedHtmlCodeString(
        code,
        lang,
      );
      setHtml(html);

      return highlighter.dispose();
    };

    init();
  }, [code, lang]);

  return (
    <div className={cn("relative inline-flex", !singleLine && "w-full")}>
      {copy && (
        <ClipboardCopy
          value={code}
          className={cn(
            "absolute right-2 top-2 z-10 md:right-4",
            singleLine && "top-1/2 -translate-y-1/2",
          )}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={cn(
          "h-full max-h-[600px] w-full overflow-y-scroll rounded-md bg-secondary",
          "[&>.shiki>pre]:!min-w-0 [&>.shiki]:!h-full [&>.shiki]:!w-full [&>.shiki]:!overflow-x-auto [&>.shiki]:!rounded-md [&>.shiki]:!p-3 [&>.shiki]:!text-sm [&>.shiki]:!leading-4",

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
