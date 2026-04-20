import {
  DetailStat,
  DetailStatText,
  DetailStatValue,
} from "@/dashboard/common/DetailStat";
import { useTranslations } from "next-intl";

export function ProjectActiveTasksDetailStat({ value }: { value: number }) {
  const t = useTranslations("dashboard.projects.ProjectActiveTasksDetailStat");

  return (
    <DetailStat
      value={<DetailStatValue>{value}</DetailStatValue>}
      text={<DetailStatText>{t("text")}</DetailStatText>}
    />
  );
}
