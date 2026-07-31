import { Badge } from "@/ui/Badge";
import { twMerge } from "tailwind-merge";
import { ru, enUS } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { useLocale, useTranslations } from "next-intl";

interface OverdueBadgeProps {
  deadline: Date;
  className?: string;
}

export function OverdueBadge({ deadline, className }: OverdueBadgeProps) {
  const t = useTranslations("dashboard.common.OverdueBadge");
  const locale = useLocale();

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
          time: formatDistanceToNow(deadline, {
            addSuffix: true,
            locale: locale === "en" ? enUS : ru,
          }),
        })}
      </span>
    </Badge>
  );
}
