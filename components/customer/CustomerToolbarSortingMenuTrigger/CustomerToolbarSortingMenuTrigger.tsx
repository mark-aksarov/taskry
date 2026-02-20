"use client";

import {
  ToolbarSortingMenuTrigger,
  ToolbarSortingButtonMobile,
  ToolbarSortingButtonDesktop,
} from "@/components/common/Toolbar";

import { Item, Key } from "react-stately";
import { CustomerSortField } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { ALargeSmall, Building2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

interface CustomerToolbarSortingMenuTriggerProps {
  selectedSortField: CustomerSortField;
}

export function CustomerToolbarSortingMenuTrigger({
  selectedSortField,
}: CustomerToolbarSortingMenuTriggerProps) {
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
    <ToolbarSortingMenuTrigger
      onAction={handleAction}
      selectedKeys={[selectedSortField]}
      renderButton={() => (
        <>
          <ToolbarSortingButtonMobile data-test="customer-toolbar-sorting-button-mobile" />
          <ToolbarSortingButtonDesktop data-test="customer-toolbar-sorting-button-desktop" />
        </>
      )}
    >
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
