import { ArrowDownUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";
import { useSortingButtonDisabled } from "./useSortingButtonDisabled";

export function SortingButtonLarge(props: ButtonProps) {
  const t = useTranslations("common.SortingButtonLarge");

  const isDisabled = useSortingButtonDisabled();

  return (
    <Button
      isDisabled={isDisabled}
      variant="outlined"
      label={t("label")}
      iconLeft={<ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      {...props}
    />
  );
}
