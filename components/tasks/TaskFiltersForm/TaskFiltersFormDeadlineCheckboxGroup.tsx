import { CheckboxGroup, Checkbox } from "@/components/ui";

export function TaskFiltersFormDeadlineCheckboxGroup() {
  return (
    <CheckboxGroup label="Deadline">
      <Checkbox key="1" value="1" className="font-normal capitalize">
        Today
      </Checkbox>
      <Checkbox key="2" value="2" className="font-normal capitalize">
        Tomorrow
      </Checkbox>
      <Checkbox key="3" value="3" className="font-normal capitalize">
        This week
      </Checkbox>
      <Checkbox key="4" value="4" className="font-normal capitalize">
        Overdue
      </Checkbox>
    </CheckboxGroup>
  );
}
