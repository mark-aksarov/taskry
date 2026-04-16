import {
  DetailStat,
  DetailStatIcon,
  DetailStatText,
  DetailStatValue,
} from "@/components/common/DetailStat";
import { CircleEllipsis } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectPendingTasksDetailStat({ value }: { value: number }) {
  const t = useTranslations("projects.ProjectPendingTasksDetailStat");

  return (
    <DetailStat
      value={<DetailStatValue>{value}</DetailStatValue>}
      text={<DetailStatText>{t("text")}</DetailStatText>}
      icon={
        <DetailStatIcon>
          <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
        </DetailStatIcon>
      }
    />
  );
}
