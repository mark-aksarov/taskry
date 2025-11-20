import { DetailForm } from "@/components/common/DetailForm";
import { TaskDetailFormDeadlineDatePicker } from "./TaskDetailFormDeadlineDatePicker";
import { Button } from "@/components/ui";

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
          label="Reset"
          className={buttonClasses}
        />
        <Button
          size="medium"
          type="submit"
          label="Save"
          className={buttonClasses}
        />
      </div>
    </DetailForm>
  );
}
