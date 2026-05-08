import { ArrowDownUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/ui/Button";
import { useSortingButtonDisabled } from "./useSortingButtonDisabled";

interface SortingButtonLargeProps extends ButtonProps {
  // Extra flag to hide the label on User/Profile Tasks pages
  showLabel?: boolean;
}

export function SortingButtonLarge({
  showLabel = true,
  ...props
}: SortingButtonLargeProps) {
  const t = useTranslations("dashboard.common.SortingButtonLarge");

  const isDisabled = useSortingButtonDisabled();

  return (
    <Button
      isDisabled={isDisabled}
      variant="secondary"
      outlined
      label={showLabel ? t("label") : undefined}
      aria-label={!showLabel ? t("label") : undefined}
      iconLeft={<ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      {...props}
    />
  );
}
