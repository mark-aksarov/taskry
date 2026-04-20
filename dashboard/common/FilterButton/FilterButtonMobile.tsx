import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Plus, SlidersHorizontal } from "lucide-react";
import { Button, ButtonProps } from "@/ui/Button";
import { useFilterButtonDisabled } from "./useFilterButtonDisabled";

type FilterMode = "single" | "multiple";

interface FilterButtonMobileProps extends ButtonProps {
  selectedCount?: number;
  mode: FilterMode;
}

export function FilterButtonMobile({
  mode,
  selectedCount = 0,
  label,
  className,
  ...props
}: FilterButtonMobileProps) {
  const t = useTranslations("dashboard.common.FilterButtonMobile");
  const isDisabled = useFilterButtonDisabled();

  const icon =
    mode === "multiple" ? (
      <SlidersHorizontal size={16} absoluteStrokeWidth strokeWidth={1.5} />
    ) : (
      <Plus size={16} absoluteStrokeWidth strokeWidth={1.5} />
    );

  return (
    <Button
      variant={selectedCount > 0 ? "contrast" : "secondary"}
      className={twMerge("rounded-full px-3", className)}
      iconLeft={icon}
      isDisabled={isDisabled}
      label={selectedCount > 0 ? `${label || ""} ${selectedCount}` : label}
      aria-label={t("ariaLabel")}
      {...props}
    />
  );
}
