"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export interface AppHeaderThemeToggleButtonProps {
  className?: string;
}

export function AppHeaderThemeToggleButton({
  className,
}: AppHeaderThemeToggleButtonProps) {
  const t = useTranslations("layout.AppHeaderThemeToggleButton");
  const { theme, setTheme } = useTheme();

  if (theme === "dark") {
    return (
      <>
        <Button
          onPress={() => setTheme("light")}
          aria-label={t("darkLabel")}
          variant="ghost"
          iconLeft={<Moon size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          className={className}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onPress={() => setTheme("dark")}
        aria-label={t("lightLabel")}
        variant="ghost"
        iconLeft={<Sun size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className={className}
      />
    </>
  );
}
