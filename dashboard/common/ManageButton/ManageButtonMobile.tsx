import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/ui/Button";

export function ManageButtonMobile(props: ButtonProps) {
  const t = useTranslations("dashboard.common.ManageButtonMobile");

  return (
    <Button
      iconLeft={<Settings size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      variant="secondary"
      outlined
      aria-label={t("ariaLabel")}
      {...props}
    />
  );
}
