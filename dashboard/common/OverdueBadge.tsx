"use client";

import { Badge } from "@/ui/Badge";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { useDeadline } from "./DeadlineContext";

interface OverdueBadgeProps {
  className?: string;
}

export function OverdueBadge({ className }: OverdueBadgeProps) {
  const t = useTranslations("dashboard.common.OverdueBadge");
  const { overdue } = useDeadline();

  if (!overdue) return null;

  return (
    <Badge
      color="red"
      className={twMerge(
        "-my-0.5 max-w-full rounded-sm px-1 py-0.5",
        className,
      )}
    >
      <span className="truncate">
        {t("task.overdue", {
          time: overdue,
        })}
      </span>
    </Badge>
  );
}
