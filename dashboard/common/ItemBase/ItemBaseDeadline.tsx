import { useDeadline } from "../DeadlineContext";
import { useFormatter, useTranslations } from "next-intl";

export function ItemBaseDeadline() {
  const t = useTranslations("dashboard.common.ItemBaseDeadline");
  const { deadline } = useDeadline();

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
