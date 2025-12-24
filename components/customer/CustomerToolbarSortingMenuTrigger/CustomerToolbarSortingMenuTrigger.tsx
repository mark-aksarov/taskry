"use client";

import { Item, Key } from "react-stately";
import { useSearchParams } from "next/navigation";
import { ALargeSmall, Building2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ToolbarSortingMenuTrigger } from "@/components/common/Toolbar";

export function CustomerToolbarSortingMenuTrigger() {
  const t = useTranslations("customers.CustomerToolbarSortingMenuTrigger");
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
    <ToolbarSortingMenuTrigger onAction={handleAction}>
      <Item textValue={t("byFullName")} key="fullName">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byFullName")}
      </Item>
      <Item textValue={t("byCompany")} key="company">
        <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byCompany")}
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
