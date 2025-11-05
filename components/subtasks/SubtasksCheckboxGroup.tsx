import { CheckboxGroup, Checkbox } from "../ui";

export function SubtasksCheckboxGroup({
  subtasks,
}: {
  subtasks: { id: number; name: string; isDone: boolean }[];
}) {
  return (
    <CheckboxGroup
      label="Subtasks"
      defaultValue={subtasks
        .filter((subtask) => subtask.isDone)
        .map((subtask) => subtask.id.toString())}
      isReadOnly
    >
      {subtasks.map((subtask) => (
        <Checkbox
          key={subtask.id}
          value={subtask.id.toString()}
          className="font-normal capitalize"
        >
          {subtask.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
