"use client";

import {
  Button,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { useState } from "react";
import { Key, useOverlayTrigger } from "react-aria";
import { Blocks, FolderClosed, Plus } from "lucide-react";
import { Item, useOverlayTriggerState } from "react-stately";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

interface ProjectToolbarCreateNewMenuTriggerProps {
  newProjectForm: React.ReactNode;
  newProjectCategoryForm: React.ReactNode;
}

export function ProjectToolbarCreateNewMenuTrigger({
  newProjectForm,
  newProjectCategoryForm,
}: ProjectToolbarCreateNewMenuTriggerProps) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openProjectCategoryModal, setOpenProjectCategoryModal] =
    useState(false);

  function handleAction(key: Key) {
    if (key === "project") {
      setOpenProjectModal(true);
    } else if (key === "category") {
      setOpenProjectCategoryModal(true);
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
        <Item textValue="Project" key="project">
          <FolderClosed size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
          Project
        </Item>
        <Item textValue="Category" key="category">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth /> Category
        </Item>
      </ResponsiveMenuTrigger>

      <NewProjectModal
        newProjectForm={newProjectForm}
        isOpen={openProjectModal}
        onOpenChange={setOpenProjectModal}
      />

      {/* ProjectCategoryModal */}
    </>
  );
}
