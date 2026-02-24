"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SelectableItem } from "@/components/common/SelectableItem";
import { CompanyListItemCheckbox } from "./CompanyListItemCheckbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CompanyItemActionMenuTrigger } from "../CompanyItemActionMenuTrigger";

interface CompanyListItemProps {
  id: number;
  name: string;
  guestMode: boolean;
  updateCompany: ActionFn<ActionState, FormData>;
}

export function CompanyListItem({
  id,
  name,
  guestMode,
  updateCompany,
}: CompanyListItemProps) {
  const t = useTranslations("company.CompanyListItem");
  const selected = useSelectedItems();

  return (
    <SelectableItem {...selected} item={{ id }}>
      <ListItem data-test="company-list-item">
        <CompanyListItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <CompanyItemActionMenuTrigger
          guestMode={guestMode}
          companyId={id}
          companyName={name}
          updateCompany={updateCompany}
        />
      </ListItem>
    </SelectableItem>
  );
}
