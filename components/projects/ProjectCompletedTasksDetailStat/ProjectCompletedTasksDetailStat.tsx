import {
  DetailStat,
  DetailStatText,
  DetailStatValue,
} from "@/components/common/DetailStat";
import { useTranslations } from "next-intl";

export function ProjectCompletedTasksDetailStat({ value }: { value: number }) {
  const t = useTranslations("projects.ProjectCompletedTasksDetailStat");

  return (
    <DetailStat
      value={<DetailStatValue>{value}</DetailStatValue>}
      text={<DetailStatText>{t("text")}</DetailStatText>}
    />
  );
}
