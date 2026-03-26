"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { useCreateTask } from "../CreateTaskContext";
import { Blocks, CalendarCheck } from "lucide-react";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { CreateNewMenuTrigger } from "@/components/common/CreateNewMenuTrigger";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { useCreateTaskCategoryModal } from "@/components/taskCategory/CreateTaskCategoryModal";

interface CreateTaskMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateTaskMenuTrigger({
  renderButton,
}: CreateTaskMenuTriggerProps) {
  const t = useTranslations("tasks.CreateTaskMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create create task category form modal state
  const { onOpenChange: onCreateModalOpenChange } =
    useCreateTaskCategoryModal();

  // Create task form modal state
  const { onModalOpenChange: onTaskModalOpenChange } = useCreateTask();

  /**
   * Handles menu actions for creating a task or task category
   * - If user is a guest, show guest modal
   * - Otherwise, open create task category modal or create task modal
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "task") {
        onTaskModalOpenChange(true);
      } else if (key === "category") {
        onCreateModalOpenChange(true);
      }
    });
  }

  return (
    <>
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        )}
        renderButton={renderButton}
      >
        <Item textValue={t("items.task")} key="task">
          <CalendarCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.task")}
        </Item>
        <Item textValue={t("items.category")} key="category">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.category")}
        </Item>
      </CreateNewMenuTrigger>
    </>
  );
}
