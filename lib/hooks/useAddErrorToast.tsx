import { CircleX } from "lucide-react";
import { useCallback, useContext } from "react";
import { ToastContext } from "@/ui/Toast";

export function useAddErrorToast() {
  const toastQueue = useContext(ToastContext);

  return useCallback(
    (message: string) =>
      toastQueue.add(
        {
          title: message,
          iconLeft: <CircleX    />,
        },
        { timeout: 5000 },
      ),
    [toastQueue],
  );
}
