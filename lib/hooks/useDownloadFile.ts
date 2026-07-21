import { useState } from "react";
import { useAddErrorToast } from "./useAddErrorToast";
import { useAddSuccessToast } from "./useAddSuccessToast";

export function useDownloadFile(
  url: string,
  filename: string,
  successMessage: string,
  errorMessage: string,
): [boolean, () => Promise<void>] {
  const [isPending, setIsPending] = useState(false);

  const addSuccessToast = useAddSuccessToast();
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

      addSuccessToast(successMessage);
    } catch {
      addErrorToast(errorMessage);
    } finally {
      setIsPending(false);
    }
  }

  return [isPending, downloadFile];
}
