import { CheckCircle2 } from "lucide-react";
import { useContext, useMemo, useRef } from "react";
import { ToastContext } from "@/components/ui/Toast";

export function useSuccessToast() {
  const toastQueue = useContext(ToastContext);
  const toastKeyRef = useRef<string | null>(null);

  return useMemo(
    () => ({
      close: () => toastQueue.close(toastKeyRef.current!),
      add: (message: string) =>
        (toastKeyRef.current = toastQueue.add(
          {
            color: "green",
            title: message,
            iconLeft: (
              <CheckCircle2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
            ),
          },
          { timeout: 5000 },
        )),
    }),
    [toastQueue],
  );
}
