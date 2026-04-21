"use client";

import { Item } from "react-stately";
import { MenuTrigger } from "@/ui/Menu";
import { RussiaFlag } from "@/icons/RussiaFlag";
import { useLocale, useTranslations } from "next-intl";
import { useToggleLang } from "@/lib/hooks/useToggleLang";
import { AppHeaderLangButton } from "@/common/AppHeaderBase";
import { UnitedKingdomFlag } from "@/icons/UnitedKingdomFlag";

export const AppHeaderLangMenuTrigger = () => {
  const t = useTranslations("common.LangMenuTrigger");
  const locale = useLocale();
  const toggleLang = useToggleLang();

  return (
    <MenuTrigger
      selectionMode="single"
      selectedKeys={[locale]}
      onAction={toggleLang}
      renderButton={() => <AppHeaderLangButton />}
      placement="bottom left"
    >
      <Item textValue={t("items.english")} key="en">
        <UnitedKingdomFlag />
        {t("items.english")}
      </Item>
      <Item textValue={t("items.russian")} key="ru">
        <RussiaFlag />
        {t("items.russian")}
      </Item>
    </MenuTrigger>
  );
};
