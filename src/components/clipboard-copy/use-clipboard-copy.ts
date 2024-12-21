import { useCallback, useState } from "react";

export function useClipboardCopy() {
  const [value, setValue] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const copy = useCallback((value?: string, timeout?: number) => {
    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value);
    setValue(value);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, timeout ?? 3000);
  }, []);

  return { value, copied, copy };
}
