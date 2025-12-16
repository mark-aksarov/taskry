"use client";

import {
  Text,
  composeRenderProps,
  UNSTABLE_Toast as RACToast,
  ToastProps as RACToastProps,
  UNSTABLE_ToastRegion as RACToastRegion,
  UNSTABLE_ToastContent as RACToastContent,
} from "react-aria-components";

import { X } from "lucide-react";
import { Button } from "../Button";
import { twMerge } from "tailwind-merge";
import React, { CSSProperties, useContext } from "react";
import { ToastContext } from "./ToastContext";

export interface ToastContent {
  title: string;
  iconLeft?: React.ReactNode;
}

export function ToastRegion() {
  const toastQueue = useContext(ToastContext);

  return (
    <RACToastRegion
      queue={toastQueue}
      className="fixed bottom-4 left-4 z-2 flex flex-col-reverse gap-2"
    >
      {({ toast }) => (
        <Toast toast={toast}>
          <RACToastContent className="flex items-center gap-3 overflow-hidden text-red-700 dark:text-red-100">
            <div className="shrink-0">{toast.content.iconLeft}</div>
            <Text
              slot="title"
              className="truncate text-xs font-bold text-nowrap"
            >
              {toast.content.title}
            </Text>
          </RACToastContent>

          <Button
            slot="close"
            variant="ghost"
            iconLeft={<X size={16} strokeWidth={1.5} absoluteStrokeWidth />}
            className="-mr-2 rounded-full bg-transparent! text-red-700 dark:text-red-100"
            aria-label="Close"
          />
        </Toast>
      )}
    </RACToastRegion>
  );
}

export function Toast(props: RACToastProps<ToastContent>) {
  return (
    <RACToast
      {...props}
      style={{ viewTransitionName: props.toast.key } as CSSProperties}
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          className,
          "flex w-[330px] items-center justify-between gap-4 rounded-lg bg-red-100 px-4 py-2 shadow-sm dark:bg-red-900",
        ),
      )}
    />
  );
}
