import { useTranslations } from "next-intl";

export function SearchModalTriggerPlaceholder() {
  const t = useTranslations("dashboard.search.SearchModalTrigger");

  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {t("placeholder")}
    </div>
  );
}
