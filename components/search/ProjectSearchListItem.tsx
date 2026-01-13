import { FolderClosed } from "lucide-react";
import { SearchListItem } from "./SearchListItem";
import { IconContainer } from "../common/IconContainer";
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
      imageSlot={
        <IconContainer className="h-9 w-9">
          <FolderClosed size={16} />
        </IconContainer>
      }
      titleSlot={<ListItemTitle>{title}</ListItemTitle>}
      textSlot={<ListItemText>{deadlineOn}</ListItemText>}
    />
  );
}
