"use client";

import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";
import { usePageTransition } from "../PageTransitionContext";

export function ToolbarActionsButtonMobile({
  isDisabled,
  ...props
}: ButtonProps) {
  const t = useTranslations("common.ToolbarActionsButtonMobile");
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  return (
    <Button
      isDisabled={
        isFilteringPending ||
        isSortingPending ||
        isPaginationPending ||
        isDisabled
      }
      aria-label={t("ariaLabel")}
      variant="outlined"
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="md:hidden"
      {...props}
    />
  );
}
