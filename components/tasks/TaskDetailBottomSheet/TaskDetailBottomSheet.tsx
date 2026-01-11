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
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { EditTaskModal } from "../EditTaskModal";
import { OverlayTriggerState } from "react-stately";
import { DialogTrigger } from "react-aria-components";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

export interface TaskDetailBottomSheetProps {
  taskId: number;
  state: OverlayTriggerState;
}

export function TaskDetailBottomSheet({
  taskId,
  state,
}: TaskDetailBottomSheetProps) {
  const t = useTranslations("tasks.TaskDetailBottomSheet");

  const { TaskDetailCompactContainer } = useGlobalContainer();

  if (!TaskDetailCompactContainer) {
    throw new Error(
      "TaskDetailCompactContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>{t("title")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <Suspense fallback={<TaskDetailCompactSkeleton />}>
            <TaskDetailCompactContainer taskId={taskId} />
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
