import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";
import { useFilterButtonDisabled } from "./useFilterButtonDisabled";

interface FilterButtonLargeProps extends ButtonProps {
  "data-test"?: string;
}

export function FilterButtonLarge(props: FilterButtonLargeProps) {
  const t = useTranslations("common.FilterButtonLarge");

  const isDisabled = useFilterButtonDisabled();

  return (
    <Button
      label={t("label")}
      variant="outlined"
      isDisabled={isDisabled}
      iconLeft={
        <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
      {...props}
    />
  );
}
