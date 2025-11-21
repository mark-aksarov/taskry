import {
  DetailFormDatePicker,
  DetailFormLabel,
} from "@/components/common/DetailForm";
import { Calendar } from "lucide-react";

export function ProjectDetailFormDeadlineDatePicker() {
  return (
    <DetailFormDatePicker
      label={
        <DetailFormLabel className="w-[6rem]">
          <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Deadline
        </DetailFormLabel>
      }
    />
  );
}
