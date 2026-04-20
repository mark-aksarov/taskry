import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/ui/Button";

export function ManageButtonLarge(props: ButtonProps) {
  const t = useTranslations("dashboard.common.ManageButtonLarge");

  return (
    <Button
      iconLeft={<Settings size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      variant="outlined"
      label={t("label")}
      {...props}
    />
  );
}
