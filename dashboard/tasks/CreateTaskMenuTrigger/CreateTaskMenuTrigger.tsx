"use client";

import { Key } from "react-aria";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks, CalendarCheck } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { CreateNewMenuTrigger } from "@/dashboard/common/CreateNewMenuTrigger";

interface CreateTaskMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CreateTaskMenuTrigger({
  renderButton,
}: CreateTaskMenuTriggerProps) {
  const t = useTranslations("dashboard.tasks.CreateTaskMenuTrigger");

  // Create create task category form modal state
  const { onOpenChange: onCreateTaskCategoryModalOpenChange } =
    useModal("createTaskCategory");

  // Create task form modal state
  const { onOpenChange: onCreateTaskModalOpenChange } = useModal("createTask");

  /**
   * Open create task category modal or create task modal
   */
  function handleAction(key: Key) {
    if (key === "task") {
      onCreateTaskModalOpenChange(true);
    } else if (key === "category") {
      onCreateTaskCategoryModalOpenChange(true);
    }
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
          <CalendarCheck />
          {t("items.task")}
        </Item>
        <Item textValue={t("items.category")} key="category">
          <Blocks />
          {t("items.category")}
        </Item>
      </CreateNewMenuTrigger>
    </>
  );
}
