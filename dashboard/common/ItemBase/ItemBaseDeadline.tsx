import { useFormatter, useTranslations } from "next-intl";

export function ItemBaseDeadline({ deadline }: { deadline: Date }) {
  const t = useTranslations("dashboard.common.ItemBaseDeadline");

  // use useFormatter to format the date according to the user's locale
  const format = useFormatter();

  const deadlineOn = t("deadlineOn", {
    date: format.dateTime(deadline, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  return <>{deadlineOn}</>;
}
