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
      true: "",
    },
    isPending: {
      true: "pointer-events-none text-(--text-secondary)",
    },
    isDisabled: {
      true: "pointer-events-none text-(--text-disabled)",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isActive: true,
      isDisabled: false,
      class: "bg-(--accent) text-white",
    },
    {
      variant: "secondary",
      isActive: true,
      isDisabled: false,
      class: "bg-(--surface-primary-hover) text-(--text-link)",
    },
  ],
});
