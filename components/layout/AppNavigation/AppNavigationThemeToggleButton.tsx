"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { NavigationButton } from "@/components/common/NavigationButton";
import { AppNavigationThemeToggleButtonSkeleton } from "./AppNavigationThemeToggleButtonSkeleton";

export function AppNavigationThemeToggleButton() {
  const t = useTranslations("layout.AppNavigationThemeToggleButton");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <AppNavigationThemeToggleButtonSkeleton />;
  }

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
