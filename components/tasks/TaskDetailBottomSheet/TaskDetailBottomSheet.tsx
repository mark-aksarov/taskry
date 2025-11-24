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
import { OverlayTriggerState } from "react-stately";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact/TaskDetailCompactSkeleton";
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
          <Button
            as="a"
            href={`/tasks/${taskId}`}
            variant="primary"
            size="medium"
            label="Open in Full Page"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
