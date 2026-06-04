import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { Button, ButtonProps } from "@/ui/Button";
import { useFilterButtonDisabled } from "./useFilterButtonDisabled";

interface FilterButtonLargeProps extends ButtonProps {
  selectedCount?: number;
}

export function FilterButtonLarge({
  selectedCount = 0,
  ...props
}: FilterButtonLargeProps) {
  const t = useTranslations("dashboard.common.FilterButtonLarge");

  const isDisabled = useFilterButtonDisabled();

  const label = t("label");

  return (
    <Button
      variant={selectedCount > 0 ? "contrast" : "secondary"}
      label={selectedCount > 0 ? `${label || ""} ${selectedCount}` : label}
      outlined
      isDisabled={isDisabled}
      iconLeft={
        <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
      {...props}
    />
  );
}
