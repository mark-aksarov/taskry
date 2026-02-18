"use client";

import Image from "next/image";
import { Languages } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { MenuTrigger } from "@/components/ui/Menu";
import { DialogHeader } from "@/components/ui/Dialog";
import { usePathname, useRouter } from "@/i18n/navigation";
import { NavigationButton } from "@/components/common/NavigationButton";

export const AppNavigationLangMenuTrigger = () => {
  const t = useTranslations("layout.AppNavigationLangMenuTrigger");
  const router = useRouter();
  const pathname = usePathname();

  function toggleLang(key: Key) {
    const locale = key as "en" | "ru";
    router.push(pathname, { locale });
  }

  return (
    <MenuTrigger
      onAction={toggleLang}
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
