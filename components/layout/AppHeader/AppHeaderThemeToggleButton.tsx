"use client";

import { Sun } from "lucide-react";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";

export interface AppHeaderThemeToggleButtonProps {
  className?: string;
}

export function AppHeaderThemeToggleButton({
  className,
}: AppHeaderThemeToggleButtonProps) {
  const t = useTranslations("layout.AppHeader.themeToggleButton");

  return (
    <>
      <Button
        aria-label={t("label")}
        variant="ghost"
        iconLeft={<Sun size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className={className}
      />
    </>
  );
}
