"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { NavigationButton } from "@/components/common/NavigationButton";

export function AppNavigationThemeToggleButton() {
  const t = useTranslations("layout.AppNavigationThemeToggleButton");
  const { theme, setTheme } = useTheme();

  if (theme === "dark") {
    return (
      <>
        <NavigationButton onPress={() => setTheme("light")}>
          <Moon size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("darkLabel")}
        </NavigationButton>
      </>
    );
  }

  return (
    <>
      <NavigationButton onPress={() => setTheme("dark")}>
        <Sun size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("lightLabel")}
      </NavigationButton>
    </>
  );
}
