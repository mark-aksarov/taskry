"use client";

import {
  Button,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Key, useOverlayTrigger } from "react-aria";
import { Blocks, CalendarCheck, Plus } from "lucide-react";
import { Item, useOverlayTriggerState } from "react-stately";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

interface TaskToolbarCreateNewMenuTriggerProps {
  newTaskForm: React.ReactNode;
  newTaskCategoryForm: React.ReactNode;
}

export function TaskToolbarCreateNewMenuTrigger({
  newTaskForm,
  newTaskCategoryForm,
}: TaskToolbarCreateNewMenuTriggerProps) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openTaskCategoryModal, setOpenTaskCategoryModal] = useState(false);
  const t = useTranslations("tasks.TaskToolbarCreateNewMenuTrigger");

  function handleAction(key: Key) {
    if (key === "task") {
      setOpenTaskModal(true);
    } else if (key === "category") {
      setOpenTaskCategoryModal(true);
    }
  }

  return (
    <>
      <ResponsiveMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>
            <DialogHeading>{t("dialogHeading")}</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
        )}
        overlayClassName="md:min-w-[200px]"
        renderButton={() => (
          <Button
            {...triggerProps}
            label={t("label")}
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        )}
        placement="bottom right"
      >
        <Item textValue={t("items.task")} key="task">
          <CalendarCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.task")}
        </Item>
        <Item textValue={t("items.category")} key="category">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.category")}
        </Item>
      </ResponsiveMenuTrigger>

      <NewTaskModal
        newTaskForm={newTaskForm}
        isOpen={openTaskModal}
        onOpenChange={setOpenTaskModal}
      />

      {/* TaskCategoryModal */}
    </>
  );
}
