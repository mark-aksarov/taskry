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
import { TaskDetailSkeleton } from "../TaskDetail";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const t = useTranslations("tasks.TaskDetailModal");

  const { TaskDetailContainer } = useGlobalContainer();

  if (!TaskDetailContainer) {
    throw new Error("TaskDetailContainer is missing in GlobalContainerContext");
  }

  return (
    <Modal data-test="task-detail-modal" isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{t("title")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <Suspense fallback={<TaskDetailSkeleton />}>
            <TaskDetailContainer taskId={taskId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button
            data-test="open-full-page-button"
            as="a"
            href={`/tasks?taskId=${taskId}`}
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
