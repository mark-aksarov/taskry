import { focusRing } from "@/ui/styles";
import { tv } from "tailwind-variants";

export const styles = tv({
  extend: focusRing,
  base: [
    "flex items-center gap-4",
    "px-4 py-3",
    "rounded-lg",
    "cursor-pointer",
    "text-sm font-bold",
    "text-black dark:text-white",
  ],
  variants: {
    variant: {
      primary: "",
      secondary: "",
    },
    isActive: {
      false:
        "pressed:bg-gray-300 dark:pressed:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600",
      true: "bg-blue-600 text-white dark:bg-blue-700",
    },
    isPending: {
      true: "pointer-events-none text-gray-500 dark:text-gray-400",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isActive: true,
      class: "bg-blue-600 text-white dark:bg-blue-700",
    },
    {
      variant: "secondary",
      isActive: true,
      class: "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-300",
    },
    {
      isActive: false,
      class:
        "pressed:bg-gray-300 dark:pressed:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600",
    },
  ],
});
