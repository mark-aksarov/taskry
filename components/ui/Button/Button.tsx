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
import clsx from "clsx";

type ElementType = "button" | "a";

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

export const baseButton = tv({
  extend: focusRing,
  base: "inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg font-bold",
  variants: {
    variant: {
      primary:
        "hover:bg-blue-500 active:bg-blue-700 dark:hover:bg-blue-600 dark:active:bg-blue-800",
      secondary:
        "hover:bg-blue-100 active:bg-blue-200 dark:hover:bg-blue-300 dark:active:bg-blue-400",
      ghost:
        "hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-800",
      outlined:
        "hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-800",
      contrast:
        "hover:bg-gray-900 active:bg-gray-800 dark:hover:bg-gray-100 dark:active:bg-gray-200",
    },
    size: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-base",
    },
    isDisabled: {
      true: "pointer-events-none cursor-default",
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

const button = tv({
  extend: baseButton,
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

const iconButton = tv({
  extend: baseButton,

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
      ? clsx(className, button({ ...renderProps, variant, size }))
      : clsx(className, iconButton({ ...renderProps, variant, size })),
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

  return (
    <ReactAriaButton className={classes} {...(props as ButtonProps<"button">)}>
      {iconLeft}
      {label && <span>{label}</span>}
      {iconRight}
    </ReactAriaButton>
  );
};
