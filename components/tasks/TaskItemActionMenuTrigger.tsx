import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";

export type TaskItemActionMenuTriggerProps = {
  className?: string;
};

export function TaskItemActionMenuTrigger({
  className,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("tasks.TaskItemActionMenuTrigger");

  return (
    <ItemBaseActionMenuTrigger className={className}>
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} /> {t("delete")}
      </Item>
      <Item textValue={t("markPending")} key="pending">
        <CircleEllipsis size={16} /> {t("markPending")}
      </Item>
      <Item textValue={t("markCompleted")} key="done">
        <Check size={16} /> {t("markCompleted")}
      </Item>
      <Item textValue={t("markActive")} key="active">
        <Clock size={16} /> {t("markActive")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
