import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskStatusCheckboxGroup({
  statuses,
}: {
  statuses: { id: string; name: string }[];
}) {
  if (!statuses.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Status">
      {statuses.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
