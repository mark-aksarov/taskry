"use client";

import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { LangMenuTrigger } from "@/dashboard/layout/LangMenuTrigger";
import { NavigationButton } from "@/dashboard/common/NavigationItem";

export const AppNavigationLangMenuTrigger = () => {
  const t = useTranslations("common.LangMenuTrigger");
  return (
    <LangMenuTrigger
      renderButton={() => (
        <NavigationButton
          iconLeft={
            <Languages size={18} strokeWidth={1.5} absoluteStrokeWidth />
          }
          label={t("label")}
        />
      )}
    />
  );
};
