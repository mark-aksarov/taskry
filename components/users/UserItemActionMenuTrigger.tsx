import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";

export function UserItemActionMenuTrigger({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("users.UserItemActionMenuTrigger");

  return (
    <ItemBaseActionMenuTrigger className={className}>
      <Item textValue={t("edit")} key="edit">
        <Pencil size={16} /> {t("edit")}
      </Item>
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} /> {t("delete")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
