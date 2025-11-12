"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  Modal,
} from "@/components/ui";
import { useTaskDetailContainer } from "@/components/tasks/TaskDetail";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const TaskDetailContainer = useTaskDetailContainer();

  return (
    <Modal isDismissable className="w-[460px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>Task Details</DialogHeading>
          <DialogCloseButton iconSize={20} />
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
    </Modal>
  );
}
