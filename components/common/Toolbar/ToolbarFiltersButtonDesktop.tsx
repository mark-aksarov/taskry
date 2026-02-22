import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";
import { usePageTransition } from "../PageTransitionContext";

export function ToolbarFiltersButtonDesktop(props: ButtonProps) {
  const t = useTranslations("common.ToolbarFiltersButtonDesktop");
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  return (
    <Button
      isDisabled={isFilteringPending || isSortingPending || isPaginationPending}
      label={t("label")}
      variant="outlined"
      iconLeft={
        <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
      className="max-md:hidden"
      {...props}
    />
  );
}
