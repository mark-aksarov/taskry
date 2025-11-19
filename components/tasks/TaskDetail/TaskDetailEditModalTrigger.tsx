import { Button, RACDialogTrigger } from "@/components/ui";
import { NewTaskModal } from "../NewTaskModal";

export function TaskDetailEditModalTrigger() {
  const editTaskForm = <div>edit task form</div>;

  return (
    <RACDialogTrigger>
      <Button label="Edit" />
      <NewTaskModal newTaskForm={editTaskForm} />
    </RACDialogTrigger>
  );
}
