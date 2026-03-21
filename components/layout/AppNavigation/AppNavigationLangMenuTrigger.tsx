"use client";

import { Languages } from "lucide-react";
import { Item, Key } from "react-stately";
import { MenuTrigger } from "@/components/ui/Menu";
import { useLocale, useTranslations } from "next-intl";
import { RussiaFlag } from "@/components/icons/RussiaFlag";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UnitedKingdomFlag } from "@/components/icons/UnitedKingdomFlag";
import { NavigationButton } from "@/components/common/NavigationButton";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export const AppNavigationLangMenuTrigger = () => {
  const t = useTranslations("layout.AppNavigationLangMenuTrigger");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function toggleLang(key: Key) {
    const locale = key as "en" | "ru";
    router.push(pathname, { locale });
  }

  return (
    <MenuTrigger
      onAction={toggleLang}
      selectionMode="single"
      selectedKeys={[locale]}
      overlayType="bottomsheet"
      renderDialogHeader={() => (
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
      )}
      renderButton={() => (
        <NavigationButton
          iconLeft={
            <Languages size={18} strokeWidth={1.5} absoluteStrokeWidth />
          }
          label={t("label")}
        />
      )}
    >
      <Item textValue={t("items.english")} key="en">
        <UnitedKingdomFlag width={32} height={22} />
        {t("items.english")}
      </Item>
      <Item textValue={t("items.russian")} key="ru">
        <RussiaFlag width={32} height={22} />
        {t("items.russian")}
      </Item>
    </MenuTrigger>
  );
};
