"use client";

import {
  Modal,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { useTranslations } from "next-intl";
import { Suspense, useContext } from "react";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact";
import { TaskDetailCompactContainerContext } from "@/components/tasks/TaskDetailCompactContainer";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const TaskDetailContainer = useContext(TaskDetailCompactContainerContext);
  const t = useTranslations("tasks.TaskDetailModal");

  return (
    <Modal data-test="task-detail-modal" isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{t("title")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <Suspense fallback={<TaskDetailCompactSkeleton />}>
            <TaskDetailContainer taskId={taskId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button
            data-test="open-full-page-button"
            as="a"
            href={`/tasks/${taskId}`}
            variant="primary"
            size="medium"
            label={t("openButtonLabel")}
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
