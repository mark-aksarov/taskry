"use client";

import {
  MenuTrigger,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { Item } from "react-stately";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { NavigationButton } from "@/components/common/NavigationButton";

export const AppNavigationLangMenuTrigger = () => {
  const t = useTranslations("layout.AppNavigation.langMenuTrigger");

  return (
    <MenuTrigger
      overlayType="bottomsheet"
      renderDialogHeader={() => (
        <DialogHeader>
          <DialogHeading>{t("dialogHeading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
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
