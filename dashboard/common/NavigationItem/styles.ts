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
      false:
        "pressed:bg-(--surface-primary-pressed) hover:bg-(--surface-primary-hover)",
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
      class: "bg-(--surface-primary-hover) text-(--text-info)",
    },
  ],
});
