import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui";

export function ToolbarActionsButtonMobile(props: ButtonProps) {
  const t = useTranslations("common.ToolbarActionsButtonMobile");

  return (
    <Button
      aria-label={t("ariaLabel")}
      variant="outlined"
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="md:hidden"
      {...props}
    />
  );
}
