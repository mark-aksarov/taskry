"use client";

import {
  ToolbarSortingMenuTrigger,
  ToolbarSortingButtonMobile,
  ToolbarSortingButtonDesktop,
} from "@/components/common/Toolbar";

import { Item, Key } from "react-stately";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ALargeSmall, BriefcaseBusiness } from "lucide-react";

export function UserToolbarSortingMenuTrigger() {
  const t = useTranslations("users.UserToolbarSortingMenuTrigger");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleAction = (key: Key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", key as string);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { locale });
  };

  return (
    <ToolbarSortingMenuTrigger
      onAction={handleAction}
      renderButton={() => (
        <>
          <ToolbarSortingButtonMobile data-test="user-toolbar-sorting-button-mobile" />
          <ToolbarSortingButtonDesktop data-test="user-toolbar-sorting-button-desktop" />
        </>
      )}
    >
      <Item textValue={t("byFullName")} key="fullName">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byFullName")}
      </Item>
      <Item textValue={t("byPosition")} key="position">
        <BriefcaseBusiness size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byPosition")}
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
