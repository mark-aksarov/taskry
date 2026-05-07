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
import { twMerge } from "tailwind-merge";
import { ToastContext } from "./ToastContext";
import React, { CSSProperties, useContext } from "react";

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
      red: "bg-(--bg-danger-1) text-(--text-danger)",
      green: "bg-(--bg-success-1) text-(--text-success)",
    },
  },
  slots: {
    region: "fixed bottom-4 left-4 z-3 flex flex-col-reverse gap-2",
    text: "text-xs font-bold",
    button: "ml-auto flex items-start bg-transparent! p-0 text-inherit!",
  },
});

export function ToastRegion() {
  const toastQueue = useContext(ToastContext);
  const { region, base, text, button } = styles();

  return (
    <RACToastRegion queue={toastQueue} className={region()}>
      {({ toast }) => (
        <Toast toast={toast}>
          <RACToastContent
            className={base({ color: toast.content.color || "red" })}
          >
            <div className="shrink-0">{toast.content.iconLeft}</div>
            <Text slot="title" className={text()}>
              {toast.content.title}
            </Text>

            <Button
              slot="close"
              variant="ghost"
              iconLeft={<X size={16} strokeWidth={1.5} absoluteStrokeWidth />}
              className={button()}
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
          "animate-slide-in flex w-[330px] overflow-hidden rounded-lg shadow-sm max-md:w-[calc(100vw-2rem)]",
        ),
      )}
    />
  );
}
