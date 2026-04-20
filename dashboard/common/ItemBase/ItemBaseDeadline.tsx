import { useFormatter, useTranslations } from "next-intl";

export function ItemBaseDeadline({ deadline }: { deadline: string }) {
  const t = useTranslations("dashboard.common.ItemBaseDeadline");

  // use useFormatter to format the date according to the user's locale
  const format = useFormatter();

  const deadlineOn = t("deadlineOn", {
    date: format.dateTime(new Date(deadline), {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  return <>{deadlineOn}</>;
}
