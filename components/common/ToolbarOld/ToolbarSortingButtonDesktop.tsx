import { ArrowDownUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";
import { usePageTransition } from "../PageTransitionContext";

export function ToolbarSortingButtonDesktop(props: ButtonProps) {
  const t = useTranslations("common.ToolbarSortingButtonDesktop");
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  return (
    <Button
      isDisabled={isFilteringPending || isSortingPending || isPaginationPending}
      variant="outlined"
      label={t("label")}
      iconLeft={<ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="max-md:hidden"
      {...props}
    />
  );
}
