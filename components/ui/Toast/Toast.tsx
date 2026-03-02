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
import { tv } from "tailwind-variants";
import { ToastContext } from "./ToastContext";
import React, { CSSProperties, useContext } from "react";
import { twMerge } from "tailwind-merge";

export type ToastColor = "red" | "green";

export interface ToastContent {
  title: string;
  iconLeft?: React.ReactNode;
  color?: ToastColor;
}

const styles = tv({
  base: "flex w-full gap-3 p-4",
  variants: {
    color: {
      red: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100",
      green:
        "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
    },
  },
});

export function ToastRegion() {
  const toastQueue = useContext(ToastContext);

  return (
    <RACToastRegion
      queue={toastQueue}
      className="fixed bottom-4 left-4 z-4 flex flex-col-reverse gap-2"
    >
      {({ toast }) => (
        <Toast toast={toast}>
          <RACToastContent
            className={styles({ color: toast.content.color || "red" })}
          >
            <div className="shrink-0">{toast.content.iconLeft}</div>
            <Text slot="title" className="text-xs font-bold">
              {toast.content.title}
            </Text>

            <Button
              slot="close"
              variant="ghost"
              iconLeft={<X size={16} strokeWidth={1.5} absoluteStrokeWidth />}
              className="ml-auto flex items-start bg-transparent! p-0 text-inherit!"
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
          "flex w-[330px] overflow-hidden rounded-lg shadow-sm [view-transition-class:toast]",
        ),
      )}
    />
  );
}
