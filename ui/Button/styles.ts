import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

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
      class: "bg-(--button-surface-contrast) text-(--button-text-contrast)",
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
