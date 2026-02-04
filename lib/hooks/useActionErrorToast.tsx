import { CircleX } from "lucide-react";
import { useEffect, useContext } from "react";
import { ActionState } from "../actions/types";
import { ToastContext } from "@/components/ui/Toast";

export function useActionErrorToast(state: ActionState, message: string) {
  const toastQueue = useContext(ToastContext);

  useEffect(() => {
    if (state.status === "error") {
      const toastKey = toastQueue.add(
        {
          title: message,
          iconLeft: <CircleX size={16} strokeWidth={1.5} absoluteStrokeWidth />,
        },
        { timeout: 5000 },
      );

      return () => toastQueue.close(toastKey);
    }
  }, [state, message, toastQueue]);
}
