import { Checkbox, CheckboxGroup } from "@/components/ui";

export function TaskStatusCheckboxGroup() {
  return (
    <CheckboxGroup label="Status">
      <Checkbox value="pending" className="font-normal">
        Pending
      </Checkbox>
      <Checkbox value="active" className="font-normal">
        Active
      </Checkbox>
      <Checkbox value="done" className="font-normal">
        Done
      </Checkbox>
    </CheckboxGroup>
  );
}
