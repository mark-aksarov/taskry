"use client";

import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LangMenuTrigger } from "@/components/common/LangMenuTrigger";

export const AppHeaderLangMenuTrigger = () => {
  const t = useTranslations("common.LangMenuTrigger");

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
