import { CheckboxGroup, Checkbox } from "@/components/ui";

export function ProjectCategoryCheckboxGroup({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  return (
    <CheckboxGroup label="Category">
      {categories.map((item) => (
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
