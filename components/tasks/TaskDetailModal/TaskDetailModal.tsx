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

import { Suspense, useContext } from "react";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact";
import { TaskDetailCompactClientContainerContext } from "@/components/tasks/TaskDetailCompactClientContainer";
import { useTranslations } from "next-intl";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const TaskDetailClientContainer = useContext(
    TaskDetailCompactClientContainerContext,
  );
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
            <TaskDetailClientContainer taskId={taskId} />
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
