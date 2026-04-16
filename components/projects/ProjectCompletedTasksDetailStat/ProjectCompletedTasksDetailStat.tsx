import {
  DetailStat,
  DetailStatIcon,
  DetailStatText,
  DetailStatValue,
} from "@/components/common/DetailStat";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectCompletedTasksDetailStat({ value }: { value: number }) {
  const t = useTranslations("projects.ProjectCompletedTasksDetailStat");

  return (
    <DetailStat
      value={<DetailStatValue>{value}</DetailStatValue>}
      text={<DetailStatText>{t("text")}</DetailStatText>}
      icon={
        <DetailStatIcon>
          <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
        </DetailStatIcon>
      }
    />
  );
}
