"use client";

import { Plus } from "lucide-react";
import { tv } from "tailwind-variants";
import { linkStyles } from "../ui/Link";
import { useTranslations } from "next-intl";
import { composeRenderProps, ButtonProps, Button } from "react-aria-components";

const styles = tv({
  extend: linkStyles,
  base: "self-start text-sm font-semibold",
});

export function NewSubtasksButton({
  className,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) {
  const t = useTranslations("subtasks.NewSubtasksButton");

  return (
    <Button
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant: "primary", className }),
      )}
    >
      <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {t("label")}
    </Button>
  );
}
