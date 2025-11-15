import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskFiltersFormProjectCheckboxGroup({
  projects,
}: {
  projects: { id: number; title: string }[];
}) {
  if (!projects.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Project">
      {projects.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.title}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
