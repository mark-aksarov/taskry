import { Item } from "react-stately";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";

export type CustomerItemActionMenuTriggerProps = {
  className?: string;
};

export function CustomerItemActionMenuTrigger({
  className,
}: CustomerItemActionMenuTriggerProps) {
  const t = useTranslations("customers.CustomerItemActionMenuTrigger");

  return (
    <ItemBaseActionMenuTrigger className={className}>
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} /> {t("delete")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
