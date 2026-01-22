import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui";

export function ToolbarFiltersButtonMobile(props: ButtonProps) {
  const t = useTranslations("common.Toolbar.ToolbarFiltersModalTrigger");

  return (
    <Button
      aria-label={t("trigger.ariaLabel")}
      variant="outlined"
      iconLeft={
        <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
      className="md:hidden"
      {...props}
    />
  );
}
