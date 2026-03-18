import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";
import { useActionsButtonDisabled } from "./useActionsButtonDisabled";

interface ActionsButtonProps extends ButtonProps {
  "data-test"?: string;
  selectedIds: number[];
  // Extra flag to hide the label on User/Profile Tasks pages
  showLabel?: boolean;
}
export function ActionsButton({
  selectedIds,
  showLabel = true,
  ...props
}: ActionsButtonProps) {
  const t = useTranslations("common.ActionsButton");

  const isDisabled = useActionsButtonDisabled(selectedIds);

  return (
    <Button
      variant="outlined"
      label={showLabel ? t("label") : undefined}
      aria-label={!showLabel ? t("label") : undefined}
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      isDisabled={isDisabled}
      {...props}
    />
  );
}
