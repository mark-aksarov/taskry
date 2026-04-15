import { Badge } from "@/components/ui/Badge";
import { useFormatter, useTranslations } from "next-intl";

interface TaskDetailDeadlineProps {
  deadline?: string;
}

export function TaskDetailDeadline({ deadline }: TaskDetailDeadlineProps) {
  const t = useTranslations("tasks.TaskDetail");

  const format = useFormatter();

  const formattedDeadline = deadline
    ? format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noDeadline");

  return (
    <Badge color="gray" className="self-start">
      {formattedDeadline}
    </Badge>
  );
}
