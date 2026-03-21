"use client";

import Image from "next/image";
import { Item, Key } from "react-stately";
import { Placement } from "../ui/Popover";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ResponsiveMenuTrigger } from "./ResponsiveMenuTrigger";
import { DialogHeaderWithClose } from "./DialogHeaderWithClose";

interface LangMenuTriggerProps {
  renderButton: () => React.ReactNode;
  placement?: Placement;
}

export const LangMenuTrigger = ({
  renderButton,
  placement = "bottom right",
}: LangMenuTriggerProps) => {
  const t = useTranslations("common.LangMenuTrigger");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function toggleLang(key: Key) {
    const locale = key as "en" | "ru";
    router.push(pathname, { locale });
  }

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => (
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
      )}
      selectionMode="single"
      selectedKeys={[locale]}
      onAction={toggleLang}
      renderButton={renderButton}
      placement={placement}
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
    </ResponsiveMenuTrigger>
  );
};
