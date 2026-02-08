"use client";

import {
  LinkProps as ReactAriaLinkProps,
  Link as ReactAriaLink,
  ButtonProps as ReactAriaButtonProps,
  Button as ReactAriaButton,
  composeRenderProps,
  LinkRenderProps,
  ButtonRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "../styles";
import { Loader2 } from "lucide-react";

export type ElementType = "button" | "a";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outlined"
  | "contrast";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonOwnProps<T extends ElementType> = {
  as?: T;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  label?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export type ButtonBaseProps<T extends ElementType> = T extends "a"
  ? ReactAriaLinkProps & React.RefAttributes<HTMLAnchorElement>
  : ReactAriaButtonProps & React.RefAttributes<HTMLButtonElement>;

export type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps<T> &
  Omit<ButtonBaseProps<T>, keyof ButtonOwnProps<T>>;

export const baseButtonStyles = tv({
  extend: focusRing,
  base: "inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg font-bold",
  variants: {
    variant: {
      primary:
        "pressed:bg-blue-700 dark:pressed:bg-blue-800 hover:bg-blue-500 dark:hover:bg-blue-600",
      secondary:
        "pressed:bg-blue-300 dark:pressed:bg-blue-400 hover:bg-blue-200 dark:hover:bg-blue-300",
      ghost:
        "pressed:bg-gray-300 dark:pressed:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
      outlined:
        "pressed:bg-gray-300 dark:pressed:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
      contrast:
        "pressed:bg-gray-800 dark:pressed:bg-gray-300 hover:bg-gray-900 dark:hover:bg-gray-200",
    },
    size: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-base",
    },
    isDisabled: {
      true: "pointer-events-none cursor-default",
    },
    isPending: {
      true: "pointer-events-none opacity-50",
    },
  },
  compoundVariants: [
    {
      variant: ["primary", "secondary", "outlined", "contrast"],
      isDisabled: true,
      class: "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500",
    },
    {
      variant: "ghost",
      isDisabled: true,
      class: "text-gray-400 dark:text-gray-500",
    },
    {
      variant: "primary",
      isDisabled: false,
      class: "bg-blue-600 text-white dark:bg-blue-700",
    },
    {
      variant: "secondary",
      isDisabled: false,
      class: "bg-blue-50 text-blue-600 dark:bg-blue-200 dark:text-blue-800",
    },
    {
      variant: "outlined",
      isDisabled: false,
      class:
        "border border-gray-300 text-black dark:border-gray-600 dark:text-white",
    },
    {
      variant: "contrast",
      isDisabled: false,
      class: "bg-black text-white dark:bg-white dark:text-black",
    },
    {
      variant: "ghost",
      isDisabled: false,
      class: "text-black dark:text-white",
    },
  ],
});

export const buttonStyles = tv({
  extend: baseButtonStyles,
  variants: {
    size: {
      small: "px-3 py-2",
      medium: "px-5 py-3",
      large: "px-6 py-4",
    },
  },
  compoundVariants: [
    {
      size: "small",
      variant: "outlined",
      isDisabled: false,
      class: "px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*2-1px)]",
    },
    {
      size: "medium",
      variant: "outlined",
      isDisabled: false,
      class: "px-[calc(var(--spacing)*5-1px)] py-[calc(var(--spacing)*3-1px)]",
    },
    {
      size: "large",
      variant: "outlined",
      isDisabled: false,
      class: "px-[calc(var(--spacing)*6-1px)] py-[calc(var(--spacing)*4-1px)]",
    },
  ],
});

export const iconButtonStyles = tv({
  extend: baseButtonStyles,

  variants: {
    size: {
      small: "p-2",
      medium: "p-3",
      large: "p-4",
    },
  },

  compoundVariants: [
    {
      size: "small",
      variant: "outlined",
      isDisabled: false,
      class: "p-[calc(var(--spacing)*2-1px)]",
    },
    {
      size: "medium",
      variant: "outlined",
      isDisabled: false,
      class: "p-[calc(var(--spacing)*3-1px)]",
    },
    {
      size: "large",
      variant: "outlined",
      isDisabled: false,
      class: "p-[calc(var(--spacing)*4-1px)]",
    },
  ],
});

export const Button = <T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "small",
  iconLeft,
  iconRight,
  label,
  className,
  ...props
}: ButtonProps<T>) => {
  const classes = composeRenderProps<
    string | undefined,
    LinkRenderProps | ButtonRenderProps,
    string
  >(className, (className, renderProps) =>
    label
      ? buttonStyles({ ...renderProps, variant, size, className })
      : iconButtonStyles({ ...renderProps, variant, size, className }),
  );

  if (as === "a") {
    return (
      <ReactAriaLink className={classes} {...(props as ButtonProps<"a">)}>
        {iconLeft}
        {label && <span>{label}</span>}
        {iconRight}
      </ReactAriaLink>
    );
  }

  const buttonProps = props as ButtonProps<"button">;

  return (
    <ReactAriaButton className={classes} {...buttonProps}>
      {buttonProps.isPending && (
        <Loader2
          data-testid="loader-icon"
          size={size === "small" ? 16 : size === "medium" ? 18 : 20}
          strokeWidth={size === "small" ? 1.5 : size === "medium" ? 1.75 : 2}
          absoluteStrokeWidth
          className="animate-spin"
        />
      )}
      {iconLeft}
      {label && <span>{label}</span>}
      {iconRight}
    </ReactAriaButton>
  );
};
