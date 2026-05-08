import { ArrowDownUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/ui/Button";
import { useSortingButtonDisabled } from "./useSortingButtonDisabled";

export function SortingButtonMobile(props: ButtonProps) {
  const t = useTranslations("dashboard.common.SortingButtonMobile");

  const isDisabled = useSortingButtonDisabled();

  return (
    <Button
      isDisabled={isDisabled}
      label={t("ariaLabel")}
      variant="secondary"
      iconLeft={<ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      {...props}
    />
  );
}
