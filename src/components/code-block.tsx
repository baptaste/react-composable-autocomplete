import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

import { cn } from "@/lib/utils/cn";

type CodeBlockProps = {
  code: string;
  lang?: "tsx" | "json";
  theme?: "github-dark-default" | "github-light-default";
  className?: string;
};

export const CodeBlock = ({
  code,
  lang = "tsx",
  theme = "github-dark-default",
  className,
}: CodeBlockProps) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const highlightCode = async () => {
      const highlighter = await createHighlighter({
        themes: [theme],
        langs: [lang],
      });
      const highlighted = highlighter.codeToHtml(code, { theme, lang });
      setHtml(highlighted);
    };

    highlightCode();
  }, [code, lang, theme]);

  return (
    <pre
      className={cn(
        "[&>.shiki]:!w-full [&>.shiki]:!overflow-x-auto [&>.shiki]:!rounded-md [&>.shiki]:!p-3 [&>.shiki]:!text-sm [&>.shiki]:!leading-4",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
};
