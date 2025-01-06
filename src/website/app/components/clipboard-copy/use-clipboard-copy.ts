import { useCallback, useState } from "react";

export function useClipboardCopy() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback((value?: string, timeout = 3000) => {
    if (!value || !navigator?.clipboard) return;

    navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, timeout);
  }, []);

  return { copied, copy };
}
