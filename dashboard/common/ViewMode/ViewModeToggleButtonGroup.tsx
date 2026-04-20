"use client";

import { ToggleButton, ToggleButtonGroup } from "@/ui/ToggleButtonGroup";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { useViewMode, ViewMode } from "./ViewModeContext";

export const ViewModeToggleButtonGroup = ({
  className,
}: {
  className?: string;
}) => {
  const { viewMode, changeViewMode } = useViewMode();
  const t = useTranslations("dashboard.common.ViewModeToggleButtonGroup");

  return (
    <ToggleButtonGroup
      selectionMode="single"
      selectedKeys={[viewMode]}
      className={twMerge(className, "gap-2")}
      variant="contrast"
      disallowEmptySelection
      onSelectionChange={(keys) => {
        const [key] = Array.from(keys);
        changeViewMode(key as ViewMode);
      }}
    >
      <ToggleButton id="list">{t("list")}</ToggleButton>
      <ToggleButton id="grid">{t("cards")}</ToggleButton>
    </ToggleButtonGroup>
  );
};
