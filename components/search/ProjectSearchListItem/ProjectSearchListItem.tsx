import { SearchListItem } from "../SearchListItem";
import { useFormatter, useTranslations } from "next-intl";
import { ListItemText, ListItemTitle } from "@/components/common/List";

interface ProjectSearchListItemProps {
  id: number;
  title: string;
  deadline: Date;
}

export function ProjectSearchListItem({
  id,
  title,
  deadline,
}: ProjectSearchListItemProps) {
  const t = useTranslations("search.SearchListItem");

  const format = useFormatter();

  const deadlineOn = t("deadlineOn", {
    date: format.dateTime(deadline, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  return (
    <SearchListItem
      href={`/projects/${id}`}
      titleSlot={<ListItemTitle>{title}</ListItemTitle>}
      textSlot={<ListItemText>{deadlineOn}</ListItemText>}
    />
  );
}
