"use client";

import { useContext, useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { ToastContext, ToastRegion } from "../ui/Toast";

export function ToastRegionWrapper() {
  const toastQueue = useContext(ToastContext);
  const pathname = usePathname();

  useEffect(() => toastQueue.clear(), [toastQueue, pathname]);

  return <ToastRegion />;
}
