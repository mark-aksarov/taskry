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
  | "accent"
  | "primary"
  | "secondary"
  | "tertiary"
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
  outlined?: boolean;
};

export type ButtonBaseProps<T extends ElementType> = T extends "a"
  ? ReactAriaLinkProps & React.RefAttributes<HTMLAnchorElement>
  : ReactAriaButtonProps & React.RefAttributes<HTMLButtonElement>;

export type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps<T> &
  Omit<ButtonBaseProps<T>, keyof ButtonOwnProps<T>>;

export const baseButtonStyles = tv({
  extend: focusRing,
  base: "flex cursor-pointer items-center gap-x-1.5 rounded-lg font-bold whitespace-nowrap",
  variants: {
    variant: {
      accent: "pressed:bg-(--accent-pressed) hover:bg-(--accent-hover)",
      primary:
        "pressed:bg-(--surface-primary-pressed) hover:bg-(--surface-primary-hover)",
      secondary:
        "pressed:bg-(--surface-secondary-pressed) hover:bg-(--surface-secondary-hover)",
      tertiary: "pressed:bg-(--surface-tertiary-pressed)",
      contrast:
        "pressed:bg-(--button-surface-contrast-pressed) hover:bg-(--button-surface-contrast-hover)",
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
    outlined: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      class: "bg-(--button-surface-disabled) text-(--text-disabled)",
    },
    {
      variant: "accent",
      isDisabled: false,
      class: "bg-(--accent) text-white",
    },
    {
      variant: "primary",
      isDisabled: false,
      class: "bg-(--surface-primary) text-(--text-primary)",
    },
    {
      variant: "secondary",
      isDisabled: false,
      class: "bg-(--surface-secondary) text-(--text-primary)",
    },
    {
      variant: "tertiary",
      isDisabled: false,
      class: "bg-(--surface-tertiary) text-(--text-primary)",
    },
    {
      variant: "contrast",
      isDisabled: false,
      class: "bg-(--button-surface-contrast) text-(--text-contrast)",
    },
    {
      outlined: true,
      isDisabled: false,
      class: "border border-(--border-primary) text-(--text-primary)",
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
      outlined: true,
      isDisabled: false,
      class: "px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*2-1px)]",
    },
    {
      size: "medium",
      outlined: true,
      isDisabled: false,
      class: "px-[calc(var(--spacing)*5-1px)] py-[calc(var(--spacing)*3-1px)]",
    },
    {
      size: "large",
      outlined: true,
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
      outlined: true,
      isDisabled: false,
      class: "p-[calc(var(--spacing)*2-1px)]",
    },
    {
      size: "medium",
      outlined: true,
      isDisabled: false,
      class: "p-[calc(var(--spacing)*3-1px)]",
    },
    {
      size: "large",
      outlined: true,
      isDisabled: false,
      class: "p-[calc(var(--spacing)*4-1px)]",
    },
  ],
});

export const Button = <T extends ElementType = "button">({
  as,
  variant,
  size = "small",
  outlined,
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
      ? buttonStyles({ ...renderProps, variant, size, outlined, className })
      : iconButtonStyles({
          ...renderProps,
          variant,
          size,
          outlined,
          className,
        }),
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
