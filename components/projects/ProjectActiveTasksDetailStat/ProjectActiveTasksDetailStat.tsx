import {
  DetailStat,
  DetailStatText,
  DetailStatValue,
} from "@/components/common/DetailStat";
import { useTranslations } from "next-intl";

export function ProjectActiveTasksDetailStat({ value }: { value: number }) {
  const t = useTranslations("projects.ProjectActiveTasksDetailStat");

  return (
    <DetailStat
      value={<DetailStatValue>{value}</DetailStatValue>}
      text={<DetailStatText>{t("text")}</DetailStatText>}
    />
  );
}
