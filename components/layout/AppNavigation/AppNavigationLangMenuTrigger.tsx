"use client";

import { Item } from "react-stately";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { MenuTrigger } from "@/components/ui/Menu";
import { DialogHeader } from "@/components/ui/Dialog";
import { NavigationButton } from "@/components/common/NavigationButton";

export const AppNavigationLangMenuTrigger = () => {
  const t = useTranslations("layout.AppNavigationLangMenuTrigger");

  return (
    <MenuTrigger
      overlayType="bottomsheet"
      renderDialogHeader={() => (
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
      )}
      renderButton={() => (
        <NavigationButton>
          <Languages size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("label")}
        </NavigationButton>
      )}
    >
      <Item textValue={t("items.english")} key="delete">
        <img
          src={`https://flagcdn.com/gb.svg`}
          alt={t("items.english")}
          className="w-[2rem]"
        />
        {t("items.english")}
      </Item>
      <Item textValue={t("items.russian")} key="pending">
        <img
          src={`https://flagcdn.com/ru.svg`}
          alt={t("items.russian")}
          className="w-[2rem]"
        />
        {t("items.russian")}
      </Item>
    </MenuTrigger>
  );
};
