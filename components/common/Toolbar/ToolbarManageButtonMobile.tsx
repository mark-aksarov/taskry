import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";

export function ToolbarManageButtonMobile(props: ButtonProps) {
  const t = useTranslations("common.ToolbarManageButtonMobile");

  return (
    <Button
      aria-label={t("ariaLabel")}
      variant="outlined"
      iconLeft={<Settings size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="md:hidden"
      {...props}
    />
  );
}
