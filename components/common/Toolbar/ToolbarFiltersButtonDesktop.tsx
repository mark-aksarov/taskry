import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";

export function ToolbarFiltersButtonDesktop(props: ButtonProps) {
  const t = useTranslations("common.ToolbarFiltersButtonDesktop");

  return (
    <Button
      label={t("label")}
      variant="outlined"
      iconLeft={
        <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
      className="max-md:hidden"
      {...props}
    />
  );
}
