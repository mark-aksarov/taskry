import { useTranslations } from "next-intl";

export function AssignedTasksSectionHeading() {
  const t = useTranslations("dashboard.tasks.AssignedTasksSectionHeading");

  return (
    <h2 className="text-base font-bold text-(--text-primary)">{t("text")}</h2>
  );
}
