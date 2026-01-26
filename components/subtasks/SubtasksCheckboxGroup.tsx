import { Checkbox } from "../ui/Checkbox";
import { useTranslations } from "next-intl";
import { CheckboxGroup } from "../ui/CheckboxGroup";
import { SubtaskActionMenuTrigger } from "./SubtaskActionMenuTrigger";

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
        <div key={subtask.id} className="flex items-start gap-2">
          <Checkbox
            key={subtask.id}
            value={subtask.id.toString()}
            className="font-normal"
          >
            {subtask.text}
          </Checkbox>
          <SubtaskActionMenuTrigger />
        </div>
      ))}
    </CheckboxGroup>
  );
}
