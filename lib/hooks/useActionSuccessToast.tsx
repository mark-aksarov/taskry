import { CircleX } from "lucide-react";
import { useEffect, useContext } from "react";
import { ToastContext } from "@/components/ui/Toast";

type ActionStateWithError = {
  status?: "error" | "success" | null;
  message?: string | null;
};

export function useActionErrorToast(state: ActionStateWithError) {
  const toastQueue = useContext(ToastContext);

  useEffect(() => {
    if (state?.status === "error" && state.message) {
      toastQueue.add(
        {
          title: state.message,
          iconLeft: <CircleX size={16} strokeWidth={1.5} absoluteStrokeWidth />,
        },
        { timeout: 5000 },
      );
    }
  }, [state, toastQueue]);
}
