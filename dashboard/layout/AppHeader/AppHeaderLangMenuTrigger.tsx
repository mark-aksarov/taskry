"use client";

import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/ui/Button";
import { LangMenuTrigger } from "@/dashboard/common/LangMenuTrigger";

export const AppHeaderLangMenuTrigger = () => {
  const t = useTranslations("dashboard.common.LangMenuTrigger");

  return (
    <LangMenuTrigger
      renderButton={() => (
        <Button
          aria-label={t("label")}
          variant="ghost"
          iconLeft={
            <Languages size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="rounded-full p-3"
        />
      )}
    />
  );
};
