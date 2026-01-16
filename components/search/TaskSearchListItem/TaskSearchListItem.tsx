import { CalendarCheck2 } from "lucide-react";
import { SearchListItem } from "../SearchListItem";
import { useFormatter, useTranslations } from "next-intl";
import { IconContainer } from "@/components/common/IconContainer";
import { ListItemText, ListItemTitle } from "@/components/common/List";

interface TaskSearchListItemProps {
  id: number;
  title: string;
  deadline: Date;
}

export function TaskSearchListItem({
  id,
  title,
  deadline,
}: TaskSearchListItemProps) {
  const t = useTranslations();

  const format = useFormatter();

  const deadlineOn = t("search.SearchListItem.deadlineOn", {
    date: format.dateTime(deadline, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  return (
    <SearchListItem
      href={`/tasks?taskId=${id}`}
      imageSlot={
        <IconContainer className="h-9 w-9">
          <CalendarCheck2 size={16} />
        </IconContainer>
      }
      titleSlot={<ListItemTitle>{title}</ListItemTitle>}
      textSlot={<ListItemText>{deadlineOn}</ListItemText>}
    />
  );
}
