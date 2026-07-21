import { CheckCircle2 } from "lucide-react";
import { useCallback, useContext } from "react";
import { ToastContext } from "@/ui/Toast";

export function useAddSuccessToast() {
  const toastQueue = useContext(ToastContext);

  return useCallback(
    (message: string) =>
      toastQueue.add(
        {
          color: "green",
          title: message,
          iconLeft: (
            <CheckCircle2    />
          ),
        },
        { timeout: 5000 },
      ),
    [toastQueue],
  );
}
