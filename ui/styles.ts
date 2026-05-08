import { tv } from "tailwind-variants";

export const overlayTransitionDuration = 150;

export const focusRing = tv({
  base: "outline outline-offset-2 outline-blue-600 dark:outline-blue-700",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export const itemStyles = tv({
  base: [
    "flex w-full items-center gap-4",
    "px-4 py-3",
    "cursor-pointer outline-none",
    "text-sm text-(--text-primary)",
    "active:bg-(--surface-primary-pressed)",
  ],
  variants: {
    isHovered: {
      false: "bg-(--surface-primary)",
      true: "bg-(--surface-primary-hover)",
    },
    isFocused: {
      true: "bg-(--surface-primary-hover)",
    },
    isDisabled: {
      true: "pointer-events-none text-(--text-disabled)",
    },
  },
});

export const overlayStyles = tv({
  base: [
    "fixed top-0 left-0 z-4",
    "flex h-(--visual-viewport-height) w-full items-center justify-center",
    "bg-(--overlay-surface)",
    "transition duration-150",
  ],
  variants: {
    isEntering: {
      true: "opacity-0",
    },
    isExiting: {
      true: "opacity-0",
    },
  },
});
