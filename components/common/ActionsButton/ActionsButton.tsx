import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";
import { useActionsButtonDisabled } from "./useActionsButtonDisabled";

interface ActionsButtonProps extends ButtonProps {
  "data-test"?: string;
  selectedIds: number[];
}
export function ActionsButton({ selectedIds, ...props }: ActionsButtonProps) {
  const t = useTranslations("common.ActionsButton");

  const isDisabled = useActionsButtonDisabled(selectedIds);

  return (
    <Button
      variant="outlined"
      label={t("label")}
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      isDisabled={isDisabled}
      {...props}
    />
  );
}
