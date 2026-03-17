import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";

export function ManageButtonMobile(props: ButtonProps) {
  const t = useTranslations("common.ManageButtonMobile");

  return (
    <Button
      iconLeft={<Settings size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      variant="outlined"
      aria-label={t("ariaLabel")}
      {...props}
    />
  );
}
