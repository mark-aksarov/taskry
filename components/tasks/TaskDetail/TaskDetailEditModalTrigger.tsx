import { Suspense, useContext } from "react";
import { EditTaskModal } from "../EditTaskModal";
import { TaskFormBaseSkeleton } from "../TaskFormBase";
import { Button, RACDialogTrigger } from "@/components/ui";
import { EditTaskFormClientContainerContext } from "../EditTaskFormClientContainer";

export function TaskDetailEditModalTrigger() {
  const EditTaskFormClientContainer = useContext(
    EditTaskFormClientContainerContext,
  );

  return (
    <RACDialogTrigger>
      <Button label="Edit" />
      <EditTaskModal
        newTaskForm={
          <Suspense fallback={<TaskFormBaseSkeleton />}>
            <EditTaskFormClientContainer />
          </Suspense>
        }
      />
    </RACDialogTrigger>
  );
}
