"use client";

import Image from "next/image";
import { Item, Key } from "react-stately";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { MenuTrigger } from "@/components/ui/Menu";
import { usePathname, useRouter } from "@/i18n/navigation";

export const AppHeaderLangMenuTrigger = () => {
  const t = useTranslations("layout.AppHeaderLangMenuTrigger");
  const router = useRouter();
  const pathname = usePathname();

  function toggleLang(key: Key) {
    const locale = key as "en" | "ru";
    router.push(pathname, { locale });
  }

  return (
    <MenuTrigger
      onAction={toggleLang}
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
      <Item textValue={t("items.english")} key="en">
        <Image
          src={`https://flagcdn.com/gb.svg`}
          alt={t("items.english")}
          width={32}
          height={22}
        />
        {t("items.english")}
      </Item>
      <Item textValue={t("items.russian")} key="ru">
        <Image
          src={`https://flagcdn.com/ru.svg`}
          alt={t("items.russian")}
          width={32}
          height={22}
        />
        {t("items.russian")}
      </Item>
    </MenuTrigger>
  );
};
