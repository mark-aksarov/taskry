import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/ui/Button";

export function ManageButtonLarge(props: ButtonProps) {
  const t = useTranslations("dashboard.common.ManageButtonLarge");

  return (
    <Button
      iconLeft={<Settings    />}
      variant="secondary"
      outlined
      label={t("label")}
      {...props}
    />
  );
}
