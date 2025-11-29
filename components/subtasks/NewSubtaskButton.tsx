"use client";

import { Plus } from "lucide-react";
import { tv } from "tailwind-variants";
import { composeRenderProps } from "react-aria-components";
import { RACButton, RACButtonProps, linkStyles } from "../ui";
import { useTranslations } from "next-intl";

const styles = tv({
  extend: linkStyles,
  base: "self-start text-sm font-semibold",
});

export function NewSubtasksButton({
  className,
  ...props
}: RACButtonProps & React.RefAttributes<HTMLButtonElement>) {
  const t = useTranslations("subtasks.NewSubtasksButton");

  return (
    <RACButton
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant: "primary", className }),
      )}
    >
      <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {t("label")}
    </RACButton>
  );
}
