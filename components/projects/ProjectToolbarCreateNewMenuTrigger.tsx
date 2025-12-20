"use client";

import {
  Button,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Key, useOverlayTrigger } from "react-aria";
import { Blocks, FolderClosed, Plus } from "lucide-react";
import { Item, useOverlayTriggerState } from "react-stately";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal/NewProjectCategoryModal";

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

  const t = useTranslations("projects.ProjectToolbarCreateNewMenuTrigger");

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
        <Item textValue={t("items.project")} key="project">
          <FolderClosed size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.project")}
        </Item>
        <Item textValue={t("items.category")} key="category">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.category")}
        </Item>
      </ResponsiveMenuTrigger>

      <NewProjectModal
        newProjectForm={newProjectForm}
        isOpen={openProjectModal}
        onOpenChange={setOpenProjectModal}
      />

      <NewProjectCategoryModal
        newProjectCategoryForm={newProjectCategoryForm}
        isOpen={openProjectCategoryModal}
        onOpenChange={setOpenProjectCategoryModal}
      />
    </>
  );
}
