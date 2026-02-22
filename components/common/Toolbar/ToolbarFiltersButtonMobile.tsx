"use client";

import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";
import { usePageTransition } from "../PageTransitionContext";

export function ToolbarFiltersButtonMobile(props: ButtonProps) {
  const t = useTranslations("common.ToolbarFiltersButtonMobile");
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  return (
    <Button
      isDisabled={isFilteringPending || isSortingPending || isPaginationPending}
      aria-label={t("ariaLabel")}
      variant="outlined"
      iconLeft={
        <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
      className="md:hidden"
      {...props}
    />
  );
}
