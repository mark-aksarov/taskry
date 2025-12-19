import {
  DetailFormLabel,
  DetailFormDatePicker,
} from "@/components/common/DetailForm";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectDetailFormDeadlineDatePicker() {
  const t = useTranslations("projects.ProjectDetailForm.deadlineDatePicker");

  return (
    <DetailFormDatePicker
      label={
        <DetailFormLabel className="w-[6rem]">
          <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("label")}
        </DetailFormLabel>
      }
    />
  );
}
