import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";

export const textButtonStyles = tv({
  extend: focusRing,
  base: [
    "cursor-pointer",
    "flex items-center gap-2",
    "text-sm",
    "text-blue-600 dark:text-blue-400",
    "hover:text-blue-500 dark:hover:text-blue-500",
  ],
});
