import {
  DetailFormDatePicker,
  DetailFormLabel,
} from "@/components/common/DetailForm";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export function TaskDetailFormDeadlineDatePicker() {
  const t = useTranslations(
    "tasks.TaskDetailForm.TaskDetailFormDeadlineDatePicker",
  );

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
