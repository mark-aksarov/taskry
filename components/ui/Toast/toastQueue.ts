"use client";

import { flushSync } from "react-dom";
import { ToastContent } from "./Toast";
import { UNSTABLE_ToastQueue as RACToastQueue } from "react-aria-components";

export const toastQueue = new RACToastQueue<ToastContent>({
  // Wrap state updates in a CSS view transition.
  wrapUpdate(fn) {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});
