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
      className="fixed bottom-4 left-4 z-3 flex flex-col-reverse gap-2"
    >
      {({ toast }) => (
        <Toast toast={toast}>
          <RACToastContent className="flex w-full gap-3 text-red-700 dark:text-red-100">
            <div className="shrink-0">{toast.content.iconLeft}</div>
            <Text slot="title" className="text-xs font-bold">
              {toast.content.title}
            </Text>

            <Button
              slot="close"
              variant="ghost"
              iconLeft={<X size={16} strokeWidth={1.5} absoluteStrokeWidth />}
              className="ml-auto flex items-start rounded-full bg-transparent! p-0 text-red-700 dark:text-red-100"
              aria-label="Close"
            />
          </RACToastContent>
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
          "flex w-[330px] rounded-lg bg-red-100 p-4 shadow-sm dark:bg-red-900",
        ),
      )}
    />
  );
}
