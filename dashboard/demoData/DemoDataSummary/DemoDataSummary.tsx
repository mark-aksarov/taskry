import { useLocale, useTranslations } from "next-intl";
import { DemoDataSummaryItem } from "./DemoDataSummaryItem";

export function DemoDataSummary() {
  const t = useTranslations("dashboard.demoData.DemoDataSummary");
  const locale = useLocale();

  return (
    <div className="mt-6 flex flex-col gap-3">
      <h3 className="text-sm font-bold text-(--text-primary)">{t("title")}</h3>
      <ul className="flex flex-col gap-4">
        <DemoDataSummaryItem
          title={t("projects.title")}
          description={t("project.description", { count: 4 })}
        />
        <DemoDataSummaryItem
          title={t("tasks.title")}
          description={t("tasks.description", {
            count: locale === "ru" ? 28 : 12,
          })}
        />
        <DemoDataSummaryItem
          title={t("clients.title")}
          description={t("clients.description", {
            count: locale === "ru" ? 8 : 6,
          })}
        />
      </ul>
    </div>
  );
}
