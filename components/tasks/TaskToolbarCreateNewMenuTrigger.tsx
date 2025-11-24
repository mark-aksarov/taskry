"use client";

import {
  Button,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useState } from "react";
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
            <DialogHeading>Create New</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
        )}
        overlayClassName="md:min-w-[200px]"
        renderButton={() => (
          <Button
            {...triggerProps}
            label="Create New"
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        )}
        placement="bottom right"
      >
        <Item textValue="Task" key="task">
          <CalendarCheck size={16} strokeWidth={1.5} absoluteStrokeWidth /> Task
        </Item>
        <Item textValue="Category" key="category">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth /> Category
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
