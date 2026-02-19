"use client";

import {
  ToggleButton,
  ToggleButtonGroup,
} from "@/components/ui/ToggleButtonGroup";

import { useTranslations } from "next-intl";
import { useViewMode, ViewMode } from "./ViewModeContext";
import { twMerge } from "tailwind-merge";

export const ViewModeToggleButtonGroup = ({
  className,
}: {
  className?: string;
}) => {
  const { viewMode, setViewMode } = useViewMode();
  const t = useTranslations("common.ViewModeToggleButtonGroup");

  return (
    <ToggleButtonGroup
      selectionMode="single"
      selectedKeys={[viewMode]}
      className={twMerge(className, "gap-2")}
      variant="contrast"
      disallowEmptySelection
      onSelectionChange={(keys) => {
        const [key] = Array.from(keys);
        setViewMode(key as ViewMode);
      }}
    >
      <ToggleButton id="list">{t("list")}</ToggleButton>
      <ToggleButton id="grid">{t("grid")}</ToggleButton>
    </ToggleButtonGroup>
  );
};
