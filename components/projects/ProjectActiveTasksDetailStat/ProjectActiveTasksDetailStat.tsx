import {
  DetailStat,
  DetailStatIcon,
  DetailStatText,
  DetailStatValue,
} from "@/components/common/DetailStat";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectActiveTasksDetailStat({ value }: { value: number }) {
  const t = useTranslations("projects.ProjectActiveTasksDetailStat");

  return (
    <DetailStat
      value={<DetailStatValue>{value}</DetailStatValue>}
      text={<DetailStatText>{t("text")}</DetailStatText>}
      icon={
        <DetailStatIcon>
          <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
        </DetailStatIcon>
      }
    />
  );
}
