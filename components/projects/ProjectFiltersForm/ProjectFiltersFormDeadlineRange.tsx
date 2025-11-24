import { ResponsiveDatePicker } from "../../common/ResponsiveDatePicker";

export function ProjectFiltersFormDeadlineRange() {
  return (
    <div className="flex gap-4">
      <ResponsiveDatePicker
        className="flex-auto"
        overlayClassName="w-[var(--trigger-width)]"
        label="Deadline range"
      />
      <ResponsiveDatePicker
        className="flex-auto self-end"
        overlayClassName="w-[var(--trigger-width)]"
        aria-label="Deadline range to"
      />
    </div>
  );
}
