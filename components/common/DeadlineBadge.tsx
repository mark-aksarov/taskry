import { Badge } from "@/components/ui/Badge";
import { useFormatter, useTranslations } from "next-intl";

interface DeadlineBadgeProps {
  className?: string;
  deadline?: string;
}

export function DeadlineBadge({ className, deadline }: DeadlineBadgeProps) {
  const t = useTranslations("common.DeadlineBadge");

  const format = useFormatter();

  const formattedDeadline = deadline
    ? format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noDeadline");

  return (
    <Badge color="gray" className={className}>
      {formattedDeadline}
    </Badge>
  );
}
