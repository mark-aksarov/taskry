"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { Button, ButtonVariant } from "@/ui/Button";

export function AppHeaderThemeToggleButton() {
  const t = useTranslations("common.ThemeToggleButton");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ButtonSkeleton ghost className="h-10 w-10" />;
  }

  const commonProps = {
    variant: "secondary" as ButtonVariant,
    className: "rounded-full p-3 bg-transparent",
  };

  if (theme === "dark") {
    return (
      <>
        <Button
          onPress={() => setTheme("light")}
          aria-label={t("darkLabel")}
          iconLeft={<Moon    />}
          {...commonProps}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onPress={() => setTheme("dark")}
        aria-label={t("lightLabel")}
        iconLeft={<Sun    />}
        {...commonProps}
      />
    </>
  );
}
