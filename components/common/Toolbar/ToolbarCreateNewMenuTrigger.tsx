"use client";

import {
  Button,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { useState } from "react";
import {
  Blocks,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  Contact,
  FolderClosed,
  Plus,
  Users,
} from "lucide-react";
import { Key, useOverlayTrigger } from "react-aria";
import { Item, useOverlayTriggerState } from "react-stately";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { ResponsiveMenuTrigger } from "../ResponsiveMenuTrigger";
import { NewProjectModal } from "@/components/projects/NewProjectModal";

interface ToolbarCreateNewMenuTriggerProps {
  newTaskForm: React.ReactNode;
  newProjectForm: React.ReactNode;
}

export function ToolbarCreateNewMenuTrigger({
  newTaskForm,
  newProjectForm,
}: ToolbarCreateNewMenuTriggerProps) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  function handleAction(key: Key) {
    if (key === "task") {
      setOpenTaskModal(true);
    } else if (key === "project") {
      setOpenProjectModal(true);
    }
  }

  return (
    <>
      <ResponsiveMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader className="px-4 py-3">
            <DialogHeading className="text-base">Create New</DialogHeading>
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
        <Item textValue="Task Category" key="taskCategory">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth /> Task
          Category
        </Item>
        <Item textValue="Project" key="project">
          <FolderClosed size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
          Project
        </Item>
        <Item textValue="Project Category" key="projectCategory">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          Project Category
        </Item>
        <Item textValue="Customer" key="customer">
          <Contact size={16} strokeWidth={1.5} absoluteStrokeWidth /> Customer
        </Item>
        <Item textValue="Company" key="company">
          <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth /> Company
        </Item>
        <Item textValue="User" key="user">
          <Users size={16} strokeWidth={1.5} absoluteStrokeWidth /> User
        </Item>
        <Item textValue="Position" key="position">
          <BriefcaseBusiness size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
          Position
        </Item>
      </ResponsiveMenuTrigger>

      <NewTaskModal
        newTaskForm={newTaskForm}
        isOpen={openTaskModal}
        onOpenChange={setOpenTaskModal}
      />

      <NewProjectModal
        newProjectForm={newProjectForm}
        isOpen={openProjectModal}
        onOpenChange={setOpenProjectModal}
      />
    </>
  );
}
