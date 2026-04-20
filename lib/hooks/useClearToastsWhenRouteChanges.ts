import { useContext, useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { ToastContext } from "@/ui/Toast";

export function useClearToastQueueWhenRouteChanges() {
  const toastQueue = useContext(ToastContext);
  const pathname = usePathname();

  useEffect(() => toastQueue.clear(), [toastQueue, pathname]);
}
