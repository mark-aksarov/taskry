"use client";

import { ArrowDownUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui";

export function ToolbarSortingButtonDesktop(props: ButtonProps) {
  const t = useTranslations("common.ToolbarSortingButtonDesktop");

  return (
    <Button
      variant="outlined"
      label={t("label")}
      iconLeft={<ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="max-md:hidden"
      {...props}
    />
  );
}
