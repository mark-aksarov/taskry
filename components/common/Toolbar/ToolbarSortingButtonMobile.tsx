"use client";

import { ArrowDownUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";

export function ToolbarSortingButtonMobile(props: ButtonProps) {
  const t = useTranslations("common.ToolbarSortingButtonMobile");

  return (
    <Button
      aria-label={t("ariaLabel")}
      variant="outlined"
      iconLeft={<ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="md:hidden"
      {...props}
    />
  );
}
