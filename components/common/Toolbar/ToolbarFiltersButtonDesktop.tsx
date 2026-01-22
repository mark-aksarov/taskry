import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui";

export function ToolbarFiltersButtonDesktop(props: ButtonProps) {
  const t = useTranslations("common.Toolbar.ToolbarFiltersModalTrigger");

  return (
    <Button
      data-test="toolbar-filters-modal-trigger"
      label={t("trigger.label")}
      variant="outlined"
      iconLeft={
        <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
      className="max-md:hidden"
      {...props}
    />
  );
}
