"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "../ui/styles";
import { Button } from "react-aria-components";
import { RussiaFlag } from "../icons/RussiaFlag";
import { useLocale, useTranslations } from "next-intl";
import { UnitedKingdomFlag } from "../icons/UnitedKingdomFlag";
import { LangMenuTrigger } from "@/components/common/LangMenuTrigger";

const styles = tv({
  extend: focusRing,
  base: "mx-auto mb-10 flex cursor-pointer items-center gap-4 self-start text-sm font-bold text-black dark:text-white",
});

export const AuthLangMenuTrigger = () => {
  const t = useTranslations("common.LangMenuTrigger");
  const locale = useLocale();

  return (
    <LangMenuTrigger
      placement="bottom left"
      renderButton={() => (
        <Button className={styles}>
          {locale === "en" ? <UnitedKingdomFlag /> : <RussiaFlag />}
          {t("label")}
        </Button>
      )}
    />
  );
};
