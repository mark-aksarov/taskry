"use client";

import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { NavigationButton } from "@/dashboard/common/NavigationButton";
import { LangMenuTrigger } from "@/dashboard/common/LangMenuTrigger";

export const AppNavigationLangMenuTrigger = () => {
  const t = useTranslations("dashboard.common.LangMenuTrigger");
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
