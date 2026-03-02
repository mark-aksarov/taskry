import { CircleX } from "lucide-react";
import { useCallback, useContext } from "react";
import { ToastContext } from "@/components/ui/Toast";

export function useAddErrorToast() {
  const toastQueue = useContext(ToastContext);

  return useCallback(
    (message: string) =>
      toastQueue.add(
        {
          title: message,
          iconLeft: <CircleX size={16} strokeWidth={1.5} absoluteStrokeWidth />,
        },
        { timeout: 5000 },
      ),
    [toastQueue],
  );
}
