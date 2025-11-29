"use client";

import { Item } from "react-stately";
import { Languages } from "lucide-react";
import { Button, MenuTrigger } from "@/components/ui";
import { useTranslations } from "next-intl";

export const AppHeaderLangMenuTrigger = () => {
  const t = useTranslations("layout.AppHeader.langMenuTrigger");

  return (
    <MenuTrigger
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
      placement="bottom right"
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
