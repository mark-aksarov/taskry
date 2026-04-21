"use client";

import { Play } from "lucide-react";
import { Button } from "@/ui/Button";
import { useTranslations } from "next-intl";

export function AppNavigationCtaButton() {
  const t = useTranslations("site.CtaButton");

  return (
    <Button
      size="medium"
      iconLeft={<Play size={18} strokeWidth={1.5} absoluteStrokeWidth />}
      label={t("label")}
    />
  );
}
