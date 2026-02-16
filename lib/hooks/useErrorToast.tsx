import { CircleX } from "lucide-react";
import { useContext, useMemo, useRef } from "react";
import { ToastContext } from "@/components/ui/Toast";

export function useErrorToast() {
  const toastQueue = useContext(ToastContext);
  const toastKeyRef = useRef<string | null>(null);

  return useMemo(
    () => ({
      close: () => toastQueue.close(toastKeyRef.current!),
      add: (message: string) =>
        (toastKeyRef.current = toastQueue.add({
          title: message,
          iconLeft: <CircleX size={16} strokeWidth={1.5} absoluteStrokeWidth />,
        })),
    }),
    [toastQueue],
  );
}
