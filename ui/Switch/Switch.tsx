"use client";

import {
  composeRenderProps,
  Switch as RACSwitch,
  type SwitchProps as RACSwitchProps,
} from "react-aria-components";

import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

type SwitchProps = Omit<RACSwitchProps, "children"> &
  React.RefAttributes<HTMLLabelElement> & {
    children?: React.ReactNode;
  };

const styles = tv({
  base: [
    "flex items-center gap-2",
    "text-sm font-semibold",
    "text-(--text-primary)",
    "disabled:text-(--text-disabled)",
    "transition",
  ],
});

const track = tv({
  extend: focusRing,
  base: [
    "flex shrink-0 items-center",
    "h-[1.5rem] w-[2.75rem] px-[3px]",
    "rounded-full",
    "cursor-default",
    "transition duration-200 ease-in-out",
  ],
  variants: {
    isSelected: {
      false: "bg-(--control-toggle-surface)",
      true: "bg-(--accent)",
    },
    isDisabled: {
      true: "bg-(--control-surface-disabled)",
    },
  },
});

const handle = tv({
  base: [
    "block",
    "h-[1.125rem] w-[1.125rem]",
    "rounded-full",
    "bg-white",
    "transform transition duration-200 ease-in-out",
  ],
  variants: {
    isSelected: {
      false: "translate-x-0",
      true: "translate-x-[1.25rem]",
    },
    isDisabled: {
      true: "bg-gray-50 dark:bg-gray-600",
    },
  },
});

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <RACSwitch
      {...props}
      className={composeRenderProps(props.className, (className) =>
        styles({ className }),
      )}
    >
      {(renderProps) => (
        <>
          {children}
          <span className={track(renderProps)}>
            <span className={handle(renderProps)} />
          </span>
        </>
      )}
    </RACSwitch>
  );
}
