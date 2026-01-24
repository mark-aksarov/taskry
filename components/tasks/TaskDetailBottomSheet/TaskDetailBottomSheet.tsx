"use client";

import {
  DetailBottomSheet,
  DetailBottomSheetLink,
  DetailBottomSheetDialog,
} from "@/components/common/DetailBottomSheet";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui";

export interface TaskDetailBottomSheetProps {
  taskId: number;
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailBottomSheet({
  taskId,
  taskDetailContainer,
}: TaskDetailBottomSheetProps) {
  const t = useTranslations("tasks.TaskDetailBottomSheet");

  return (
    <DetailBottomSheet>
      <DetailBottomSheetDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{taskDetailContainer}</DialogBody>
        <DialogFooter>
          <DetailBottomSheetLink
            label={t("openInFullPage")}
            href={`/tasks?taskId=${taskId}`}
          />
        </DialogFooter>
      </DetailBottomSheetDialog>
    </DetailBottomSheet>
  );
}
