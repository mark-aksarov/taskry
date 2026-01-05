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

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const t = useTranslations("tasks.TaskDetailModal");

  const { TaskDetailCompactContainer } = useGlobalContainer();

  if (!TaskDetailCompactContainer) {
    throw new Error(
      "TaskDetailCompactContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <Modal data-test="task-detail-modal" isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
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
