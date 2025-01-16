import { createHighlighter } from "shiki";

import { CODE_HIGHLIGHTER_THEME } from "./constants";

type CodeHighlightLang = "tsx" | "js" | "json" | "bash" | "html";

async function getHighlightedHtmlCodeString(
  code: string,
  lang: CodeHighlightLang,
) {
  const highlighter = await createHighlighter({
    themes: [CODE_HIGHLIGHTER_THEME],
    langs: [lang],
  });

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: CODE_HIGHLIGHTER_THEME,
  });

  return { highlighter, html };
}

export { type CodeHighlightLang, getHighlightedHtmlCodeString };
