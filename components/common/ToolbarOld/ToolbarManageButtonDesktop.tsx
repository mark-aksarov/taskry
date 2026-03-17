import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";

export function ToolbarManageButtonDesktop(props: ButtonProps) {
  const t = useTranslations("common.ToolbarManageButtonDesktop");

  return (
    <Button
      variant="outlined"
      label={t("label")}
      iconLeft={<Settings size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="max-md:hidden"
      {...props}
    />
  );
}
