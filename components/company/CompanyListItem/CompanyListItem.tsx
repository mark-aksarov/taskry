"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { DeleteCompanyProvider } from "../DeleteCompanyContext";
import { UpdateCompanyProvider } from "../UpdateCompanyContext";
import { CompanyListItemCheckbox } from "./CompanyListItemCheckbox";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CompanyListItemPendingOverlay } from "./CompanyListItemPendingOverlay";
import { CompanyListItemActionMenuTrigger } from "./CompanyListItemActionMenuTrigger";

interface CompanyListItemProps {
  id: number;
  name: string;
  updateCompany: ActionFn<ActionState, FormData>;
  deleteCompany: ActionFn<ActionState, number>;
}

export function CompanyListItem({
  updateCompany,
  deleteCompany,
  ...props
}: CompanyListItemProps) {
  const selected = useSelectedItems();

  return (
    <UpdateCompanyProvider updateCompany={updateCompany}>
      <DeleteCompanyProvider deleteCompany={deleteCompany}>
        <CompanyListItemPendingOverlay companyId={props.id}>
          <SelectableItem {...selected} item={{ id: props.id }}>
            <CompanyListItemInner {...props} />
          </SelectableItem>
        </CompanyListItemPendingOverlay>
      </DeleteCompanyProvider>
    </UpdateCompanyProvider>
  );
}

const CompanyListItemInner = memo(
  ({
    id,
    name,
  }: Omit<CompanyListItemProps, "updateCompany" | "deleteCompany">) => {
    const t = useTranslations("company.CompanyListItem");

    return (
      <ListItem
        data-test="company-list-item "
        className="flex w-full items-center gap-4"
      >
        <CompanyListItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <CompanyListItemActionMenuTrigger companyId={id} companyName={name} />
      </ListItem>
    );
  },
);
