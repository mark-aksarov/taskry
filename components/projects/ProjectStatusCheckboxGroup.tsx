"use client";

import { CheckboxGroup } from "react-aria-components";
import { fieldStyles, Label } from "../ui/Field";
import { Checkbox } from "../ui/Checkbox";

export function ProjectStatusCheckboxGroup() {
  return (
    <CheckboxGroup className={fieldStyles()}>
      <Label>Status</Label>
      <Checkbox value="pending" className="font-normal">
        Pending
      </Checkbox>
      <Checkbox value="active" className="font-normal">
        Active
      </Checkbox>
      <Checkbox value="completed" className="font-normal">
        Completed
      </Checkbox>
    </CheckboxGroup>
  );
}
