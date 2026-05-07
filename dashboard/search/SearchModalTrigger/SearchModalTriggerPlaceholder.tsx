import { useTranslations } from "next-intl";

export function SearchModalTriggerPlaceholder() {
  const t = useTranslations("dashboard.search.SearchModalTrigger");

  return (
    <div className="text-sm text-(--text-secondary)">{t("placeholder")}</div>
  );
}
