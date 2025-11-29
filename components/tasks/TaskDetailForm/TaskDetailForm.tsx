import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import { DetailForm } from "@/components/common/DetailForm";
import { TaskDetailFormDeadlineDatePicker } from "./TaskDetailFormDeadlineDatePicker";

interface TaskDetailFormProps {
  taskStatusSelect: React.ReactNode;
  projectSelect: React.ReactNode;
  assigneeSelect: React.ReactNode;
}

export function TaskDetailForm({
  taskStatusSelect,
  projectSelect,
  assigneeSelect,
}: TaskDetailFormProps) {
  const t = useTranslations("tasks.TaskDetailForm");

  const buttonClasses = "flex-auto justify-center py-2";

  return (
    <DetailForm>
      {taskStatusSelect}
      <TaskDetailFormDeadlineDatePicker />
      {assigneeSelect}
      {projectSelect}
      <div className="flex gap-3">
        <Button
          variant="outlined"
          size="medium"
          type="reset"
          label={t("resetButtonLabel")}
          className={buttonClasses}
        />
        <Button
          size="medium"
          type="submit"
          label={t("submitButtonLabel")}
          className={buttonClasses}
        />
      </div>
    </DetailForm>
  );
}
