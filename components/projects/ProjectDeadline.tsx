import { DatePicker } from "@/components/ui/DatePicker";

export function ProjectDeadline() {
  return (
    <div className="flex flex-col gap-4">
      <DatePicker label="Deadline from" />
      <DatePicker label="Deadline to" />
    </div>
  );
}
