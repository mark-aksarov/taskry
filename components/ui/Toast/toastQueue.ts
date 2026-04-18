"use client";

import { ToastContent } from "./Toast";
import { UNSTABLE_ToastQueue as RACToastQueue } from "react-aria-components";

export const toastQueue = new RACToastQueue<ToastContent>();
