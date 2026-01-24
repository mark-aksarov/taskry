"use client";

import { Sun } from "lucide-react";
import { NavigationButton } from "@/components/common/NavigationButton";
import { useTranslations } from "next-intl";

export function AppNavigationThemeToggleButton() {
  const t = useTranslations("layout.AppNavigationThemeToggleButton");

  return (
    <>
      <NavigationButton onPress={() => {}}>
        <Sun size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("label")}
      </NavigationButton>
    </>
  );
}
