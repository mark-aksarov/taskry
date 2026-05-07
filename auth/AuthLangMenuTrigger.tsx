"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { Button } from "react-aria-components";
import { RussiaFlag } from "@/icons/RussiaFlag";
import { useLocale, useTranslations } from "next-intl";
import { UnitedKingdomFlag } from "@/icons/UnitedKingdomFlag";
import { LangMenuTrigger } from "@/dashboard/layout/LangMenuTrigger";

const styles = tv({
  extend: focusRing,
  base: "flex cursor-pointer items-center gap-4 text-sm font-bold text-(--text-primary)",
});

export const AuthLangMenuTrigger = () => {
  const t = useTranslations("common.LangMenuTrigger");
  const locale = useLocale();

  return (
    <LangMenuTrigger
      placement="bottom right"
      renderButton={() => (
        <Button className={styles}>
          {locale === "en" ? <UnitedKingdomFlag /> : <RussiaFlag />}
          {t("label")}
        </Button>
      )}
    />
  );
};
