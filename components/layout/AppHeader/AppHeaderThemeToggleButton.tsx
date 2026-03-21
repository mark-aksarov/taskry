"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonSkeleton } from "@/components/ui/Skeleton";

export interface AppHeaderThemeToggleButtonProps {
  className?: string;
}

export function AppHeaderThemeToggleButton({
  className,
}: AppHeaderThemeToggleButtonProps) {
  const t = useTranslations("layout.ThemeToggleButton");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ButtonSkeleton ghost className="h-10 w-10" />;
  }

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
