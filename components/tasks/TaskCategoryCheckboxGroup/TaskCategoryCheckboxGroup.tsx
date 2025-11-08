import { TaskCategory } from "@/generated/prisma";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskCategoryCheckboxGroup({
  categories,
}: {
  categories: Pick<TaskCategory, "id" | "name">[];
}) {
  if (!categories.length) {
    return null;
  }

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
