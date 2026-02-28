import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";

interface ToolbarActionsButtonDesktopProps extends ButtonProps {
  "data-test"?: string;
}

export function ToolbarActionsButtonDesktop(
  props: ToolbarActionsButtonDesktopProps,
) {
  const t = useTranslations("common.ToolbarActionsButtonDesktop");

  return (
    <Button
      variant="outlined"
      label={t("label")}
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="max-md:hidden"
      {...props}
    />
  );
}
