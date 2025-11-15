import { Checkbox, CheckboxGroup } from "@/components/ui";

export function ProjectFiltersFormStatusCheckboxGroup({
  statuses,
}: {
  statuses: { id: string; name: string }[];
}) {
  if (!statuses.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Status">
      {statuses.map((status) => (
        <Checkbox
          key={status.id}
          value={status.id.toString()}
          className="font-normal capitalize"
        >
          {status.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
