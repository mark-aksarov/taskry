"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ButtonSkeleton } from "@/components/ui/Skeleton";
import { NavigationButton } from "@/components/common/NavigationButton";

export function AppNavigationThemeToggleButton() {
  const t = useTranslations("layout.AppNavigationThemeToggleButton");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ButtonSkeleton ghost size="medium" />;
  }

  if (theme === "dark") {
    return (
      <>
        <NavigationButton
          onPress={() => setTheme("light")}
          iconLeft={<Moon size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("darkLabel")}
        />
      </>
    );
  }

  return (
    <>
      <NavigationButton
        onPress={() => setTheme("dark")}
        iconLeft={<Sun size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={t("lightLabel")}
      />
    </>
  );
}
