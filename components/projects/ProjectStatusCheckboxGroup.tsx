import {
  fieldStyles,
  Label,
  Checkbox,
  RACCheckboxGroup,
} from "@/components/ui";

export function ProjectStatusCheckboxGroup() {
  return (
    <RACCheckboxGroup className={fieldStyles()}>
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
    </RACCheckboxGroup>
  );
}
