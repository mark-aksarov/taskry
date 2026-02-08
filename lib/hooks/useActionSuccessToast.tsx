import { CheckCircle2 } from "lucide-react";
import { useEffect, useContext } from "react";
import { ActionState } from "../actions/types";
import { ToastContext } from "@/components/ui/Toast";

export function useActionSuccessToast(state: ActionState, message: string) {
  const toastQueue = useContext(ToastContext);

  useEffect(() => {
    if (state.status === "success") {
      const toastKey = toastQueue.add(
        {
          title: message,
          iconLeft: (
            <CheckCircle2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
          ),
          color: "green",
        },
        { timeout: 5000 },
      );

      return () => toastQueue.close(toastKey);
    }
  }, [state, message, toastQueue]);
}
