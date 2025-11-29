import { useTranslations } from "next-intl";
import { CheckboxGroup, Checkbox } from "../ui";

export function SubtasksCheckboxGroup({
  subtasks,
}: {
  subtasks: { id: number; text: string; isDone: boolean }[];
}) {
  const t = useTranslations("subtasks.SubtasksCheckboxGroup");

  return (
    <CheckboxGroup
      label={t("label")}
      defaultValue={subtasks
        .filter((subtask) => subtask.isDone)
        .map((subtask) => subtask.id.toString())}
      isReadOnly
    >
      {subtasks.map((subtask) => (
        <Checkbox
          key={subtask.id}
          value={subtask.id.toString()}
          className="font-normal"
        >
          {subtask.text}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
