"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/ListItem";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { SelectableCompanyItem } from "../SelectableCompanyItem";
import { CompanyListItemCheckbox } from "./CompanyListItemCheckbox";
import { useCompanyListItemPending } from "./useCompanyListItemPending";
import { CompanyListItemActionMenuTrigger } from "./CompanyListItemActionMenuTrigger";

interface CompanyListItemProps {
  id: number;
  name: string;
}

export function CompanyListItem(props: CompanyListItemProps) {
  const isPending = useCompanyListItemPending(props.id);

  return (
    <SelectableCompanyItem companyId={props.id}>
      <CompanyListItemInner {...props} isPending={isPending} />
    </SelectableCompanyItem>
  );
}

type InnerProps = CompanyListItemProps & {
  isPending: boolean;
};

const CompanyListItemInner = memo(function CompanyListItemInner({
  id,
  name,
  isPending,
}: InnerProps) {
  const t = useTranslations("company.CompanyListItem");

  return (
    <ListItem
      data-test="company-list-item "
      className={twMerge(
        "flex w-full items-center gap-4",
        isPending && "*:opacity-50",
      )}
    >
      <CompanyListItemCheckbox id={id} />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      <CompanyListItemActionMenuTrigger companyId={id} />
    </ListItem>
  );
});
