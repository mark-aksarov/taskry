import { ResponsiveDatePicker } from "../common/ResponsiveDatePicker";

export function ProjectDeadline() {
  return (
    <div className="flex flex-col gap-4">
      <ResponsiveDatePicker label="Deadline from" />
      <ResponsiveDatePicker label="Deadline to" />
    </div>
  );
}
