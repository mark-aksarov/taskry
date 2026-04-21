"use client";

import { Button } from "@/ui/Button";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";

export const AppHeaderLangButton = () => {
  const t = useTranslations("common.LangMenuTrigger");

  return (
    <Button
      aria-label={t("label")}
      variant="ghost"
      iconLeft={<Languages size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="rounded-full p-3"
    />
  );
};
