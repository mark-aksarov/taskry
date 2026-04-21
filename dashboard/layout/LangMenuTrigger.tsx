"use client";

import { Item } from "react-stately";
import { Placement } from "@/ui/Popover";
import { RussiaFlag } from "@/icons/RussiaFlag";
import { useLocale, useTranslations } from "next-intl";
import { useToggleLang } from "@/lib/hooks/useToggleLang";
import { UnitedKingdomFlag } from "@/icons/UnitedKingdomFlag";
import { ResponsiveMenuTrigger } from "../common/ResponsiveMenuTrigger";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface LangMenuTriggerProps {
  renderButton: () => React.ReactNode;
  placement?: Placement;
}

export const LangMenuTrigger = ({
  renderButton,
  placement = "bottom right",
}: LangMenuTriggerProps) => {
  const t = useTranslations("common.LangMenuTrigger");
  const locale = useLocale();
  const toggleLang = useToggleLang();

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
