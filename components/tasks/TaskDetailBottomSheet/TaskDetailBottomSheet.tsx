import {
  BottomSheet,
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { OverlayTriggerState } from "react-stately";
import { useTaskDetailContainer } from "../TaskDetail";

export interface TaskDetailBottomSheetProps {
  taskId: number;
  state: OverlayTriggerState;
}

export function TaskDetailBottomSheet({
  taskId,
  state,
}: TaskDetailBottomSheetProps) {
  const TaskDetailContainer = useTaskDetailContainer();

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog
        aria-label="App navigation"
        className="max-h-[calc(100dvh-6.25rem)]"
      >
        <DialogHeader>
          <DialogHeading className="text-base">Task Details</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <TaskDetailContainer taskId={taskId} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Edit Task"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
