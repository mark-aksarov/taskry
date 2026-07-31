import { Badge } from "@/ui/Badge";
import { useFormatter } from "next-intl";

interface DeadlineBadgeProps {
  className?: string;
  deadline: Date;
}

export function DeadlineBadge({ className, deadline }: DeadlineBadgeProps) {
  const format = useFormatter();

  const formattedDeadline = format.dateTime(deadline, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Badge color="gray" className={className}>
      {formattedDeadline}
    </Badge>
  );
}
