"use client";

import { Item, Key } from "react-stately";
import { Placement } from "@/ui/Popover";
import { RussiaFlag } from "@/icons/RussiaFlag";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ResponsiveMenuTrigger } from "../dashboard/common/ResponsiveMenuTrigger";
import { DialogHeaderWithClose } from "../dashboard/common/DialogHeaderWithClose";
import { UnitedKingdomFlag } from "@/icons/UnitedKingdomFlag";

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
  const searchParams = useSearchParams();

  function toggleLang(key: Key) {
    const nextLocale = key as "en" | "ru";

    router.push(`${pathname}?${searchParams.toString()}`, {
      locale: nextLocale,
    });
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
        <UnitedKingdomFlag />
        {t("items.english")}
      </Item>
      <Item textValue={t("items.russian")} key="ru">
        <RussiaFlag />
        {t("items.russian")}
      </Item>
    </ResponsiveMenuTrigger>
  );
};
