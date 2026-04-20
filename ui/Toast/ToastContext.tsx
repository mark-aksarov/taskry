"use client";

import { createContext } from "react";
import { toastQueue } from "./toastQueue";

export const ToastContext = createContext(toastQueue);
