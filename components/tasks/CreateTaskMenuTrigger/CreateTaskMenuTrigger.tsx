"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { useCreateTask } from "../CreateTaskContext";
import { Blocks, CalendarCheck } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { useGuestModeModal } from "../../common/GuestModeModal";
import { useCurrentUser } from "../../common/CurrentUserContext";
import { useCreateTaskCategory } from "../../taskCategory/CreateTaskCategoryContext";
import { CreateNewMenuTrigger } from "@/components/common/CreateNewMenuTrigger";

interface CreateTaskMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateTaskMenuTrigger({
  renderButton,
}: CreateTaskMenuTriggerProps) {
  const t = useTranslations("tasks.CreateTaskMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create task category form modal state
  const { onModalOpenChange: onTaskCategoryModalOpenChange } =
    useCreateTaskCategory();

  // Create task form modal state
  const { onModalOpenChange: onTaskModalOpenChange } = useCreateTask();

  /**
   * Handles menu actions for creating a task or task category
   * - If user is a guest, show guest modal
   * - Otherwise, open create task category modal or create task modal
   */
  function handleAction(key: Key) {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    if (key === "task") {
      onTaskModalOpenChange(true);
    } else if (key === "category") {
      onTaskCategoryModalOpenChange(true);
    }
  }

  return (
    <>
      <CreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
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
