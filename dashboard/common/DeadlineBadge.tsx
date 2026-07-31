"use client";

import { Badge } from "@/ui/Badge";
import { useFormatter } from "next-intl";
import { useDeadline } from "./DeadlineContext";

interface DeadlineBadgeProps {
  className?: string;
}

export function DeadlineBadge({ className }: DeadlineBadgeProps) {
  const { deadline } = useDeadline();
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
