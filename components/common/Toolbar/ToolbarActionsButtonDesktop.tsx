import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui";

export function ToolbarActionsButtonDesktop(props: ButtonProps) {
  const t = useTranslations("common.Toolbar.ToolbarActionsMenuTrigger");

  return (
    <Button
      data-test="toolbar-action-menu-trigger"
      variant="outlined"
      label={t("label")}
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="max-md:hidden"
      {...props}
    />
  );
}
