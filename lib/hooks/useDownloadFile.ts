import { useState } from "react";
import { useAddErrorToast } from "./useAddErrorToast";

export function useDownloadFile(
  url: string,
  filename: string,
  errorMessage: string,
): [boolean, () => Promise<void>] {
  const [isPending, setIsPending] = useState(false);

  const addErrorToast = useAddErrorToast();

  async function downloadFile() {
    try {
      setIsPending(true);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error();
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(objectUrl);
    } catch {
      addErrorToast(errorMessage);
    } finally {
      setIsPending(false);
    }
  }

  return [isPending, downloadFile];
}
