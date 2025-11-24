"use client";

import {
  Button,
  Dialog,
  DialogBody,
  BottomSheet,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { Suspense, useContext } from "react";
import { EditTaskModal } from "../EditTaskModal";
import { OverlayTriggerState } from "react-stately";
import { DialogTrigger } from "react-aria-components";
import { TaskFormBaseSkeleton } from "../TaskFormBase";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact";
import { EditTaskFormClientContainerContext } from "../EditTaskFormClientContainer";
import { TaskDetailCompactClientContainerContext } from "../TaskDetailCompactClientContainer";

export interface TaskDetailBottomSheetProps {
  taskId: number;
  state: OverlayTriggerState;
}

export function TaskDetailBottomSheet({
  taskId,
  state,
}: TaskDetailBottomSheetProps) {
  const TaskDetailClientContainer = useContext(
    TaskDetailCompactClientContainerContext,
  );

  const EditTaskFormContainer = useContext(EditTaskFormClientContainerContext);

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>Task Detail</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <Suspense fallback={<TaskDetailCompactSkeleton />}>
            <TaskDetailClientContainer taskId={taskId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <DialogTrigger>
            <Button
              variant="primary"
              size="medium"
              label="Edit"
              className="w-full justify-center"
            />
            <EditTaskModal
              editTaskForm={
                <Suspense fallback={<TaskFormBaseSkeleton />}>
                  <EditTaskFormContainer />
                </Suspense>
              }
            />
          </DialogTrigger>
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
