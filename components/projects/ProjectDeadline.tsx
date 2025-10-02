import { ResponsiveDatePicker } from "../common/ResponsiveDatePicker";

export function ProjectDeadline() {
  return (
    <div className="flex flex-col gap-4">
      <ResponsiveDatePicker
        overlayClassName="w-[var(--trigger-width)]"
        label="Deadline from"
      />
      <ResponsiveDatePicker
        overlayClassName="w-[var(--trigger-width)]"
        label="Deadline to"
      />
    </div>
  );
}
