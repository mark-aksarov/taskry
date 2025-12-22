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
import { useTranslations } from "next-intl";
import { Suspense, useContext } from "react";
import { EditTaskModal } from "../EditTaskModal";
import { OverlayTriggerState } from "react-stately";
import { DialogTrigger } from "react-aria-components";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact";
import { EditTaskFormClientContainerContext } from "../EditTaskFormClientContainerContext";
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

  if (!EditTaskFormContainer) {
    throw new Error(
      "EditTaskFormContainer must be used within a EditTaskFormContainerProvider",
    );
  }

  const t = useTranslations("tasks.TaskDetailBottomSheet");

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>{t("title")}</DialogHeading>
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
              label={t("editButtonLabel")}
              className="w-full justify-center"
            />
            <EditTaskModal taskId={taskId} />
          </DialogTrigger>
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
