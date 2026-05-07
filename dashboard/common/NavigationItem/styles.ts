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
    "text-(--text-primary)",
  ],
  variants: {
    variant: {
      primary: "",
      secondary: "",
    },
    isActive: {
      false: "pressed:bg-(--surface-1-pressed) hover:bg-(--surface-1-hover)",
      true: "bg-(--accent) text-white",
    },
    isPending: {
      true: "pointer-events-none text-(--text-secondary)",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isActive: true,
      class: "bg-(--accent) text-white",
    },
    {
      variant: "secondary",
      isActive: true,
      class: "bg-(--surface-1-hover) text-(--text-info)",
    },
  ],
});
