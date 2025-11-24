import { CheckboxGroup, Checkbox } from "@/components/ui";

export function UserFiltersFormRoleCheckboxGroup() {
  return (
    <CheckboxGroup label="Role">
      <Checkbox key="1" value="1" className="font-normal capitalize">
        Admin
      </Checkbox>
      <Checkbox key="2" value="2" className="font-normal capitalize">
        Manager
      </Checkbox>
      <Checkbox key="3" value="3" className="font-normal capitalize">
        User
      </Checkbox>
    </CheckboxGroup>
  );
}
