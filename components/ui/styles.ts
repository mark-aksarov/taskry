import { tv } from "tailwind-variants";

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
  base: "flex inline-flex w-full cursor-pointer items-center gap-4 px-4 py-3 text-sm text-black outline-none active:bg-gray-200 dark:text-white dark:active:bg-gray-700",
  variants: {
    isHovered: {
      false: "bg-white dark:bg-gray-800",
      true: "bg-gray-100 dark:bg-gray-600",
    },
    isFocused: {
      true: "bg-gray-100 dark:bg-gray-600",
    },
  },
});

export const overlayStyles = tv({
  base: "fixed top-0 left-0 z-100 flex h-(--visual-viewport-height) w-full items-center justify-center bg-black/20 transition duration-150 dark:bg-black/50",
  variants: {
    isEntering: {
      true: "opacity-0",
    },
    isExiting: {
      true: "opacity-0",
    },
  },
});
