"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditProjectModal } from "./EditProjectModal";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { DeleteEntityModal } from "../common/DeleteEntityModal";
import { startTransition, useActionState, useState } from "react";
import { UpdateProjectStatusModal } from "./UpdateProjectStatusModal";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { Check, CircleEllipsis, Clock, Pencil, Trash } from "lucide-react";

export type ProjectItemActionMenuTriggerProps = {
  projectId: number;
  projectTitle: string;
  projectStatus: string;
  className?: string;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateProjectStatusesPayload>;
};

interface UpdateStatusModalState {
  isOpen: boolean;
  textKey: "resume" | "pause" | "complete";
  nextStatus: string;
}

const initialState: ActionState = {
  status: null,
  message: null,
};

export function ProjectItemActionMenuTrigger({
  projectId,
  projectTitle,
  projectStatus,
  className,
  deleteAction,
  updateStatusAction,
}: ProjectItemActionMenuTriggerProps) {
  const t = useTranslations("projects.ProjectItemActionMenuTrigger");

  // Edit State
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // Delete State
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Update Status
  const [updateModal, setUpdateModal] = useState<UpdateStatusModalState>({
    isOpen: false,
    textKey: "resume",
    nextStatus: "complete",
  });

  const [
    updateProjectStatusState,
    updateProjectStatusAction,
    updateProjectStatusPending,
  ] = useActionState(updateStatusAction, initialState);

  useActionErrorToast(updateProjectStatusState);

  const handleAction = (key: Key) => {
    const action = key.toString();
    if (action === "edit") {
      setIsOpenEditModal(true);
    } else if (action === "delete") {
      setIsOpenDeleteModal(true);
    } else {
      if (projectStatus === action) return;

      const baseModalState = {
        isOpen: true,
        nextStatus: action,
        isDone: false,
      };

      if (action === "completed") {
        setUpdateModal({
          ...baseModalState,
          textKey: "complete",
        });
      } else if (projectStatus === "active" && action === "pending") {
        setUpdateModal({
          ...baseModalState,
          textKey: "pause",
        });
      } else if (projectStatus === "pending" && action === "active") {
        setUpdateModal({
          ...baseModalState,
          textKey: "resume",
        });
      } else {
        startTransition(() => {
          updateProjectStatusAction({ ids: [projectId], nextStatus: action });
        });
      }
    }
  };

  const disabledKeys =
    projectStatus === "completed"
      ? ["active", "pending", "completed"]
      : [projectStatus];

  return (
    <>
      <ItemBaseActionMenuTrigger
        className={className}
        onAction={handleAction}
        disabledKeys={disabledKeys}
      >
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
        <Item textValue={t("markPending")} key="pending">
          <CircleEllipsis size={16} /> {t("markPending")}
        </Item>
        <Item textValue={t("markCompleted")} key="completed">
          <Check size={16} /> {t("markCompleted")}
        </Item>
        <Item textValue={t("markActive")} key="active">
          <Clock size={16} /> {t("markActive")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <EditProjectModal
        projectId={projectId}
        isOpen={isOpenEditModal}
        onOpenChange={setIsOpenEditModal}
      />

      <DeleteEntityModal
        entityId={projectId}
        entityName={projectTitle}
        translationNamespace="projects.DeleteProjectModal"
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
      />

      <UpdateProjectStatusModal
        projectId={projectId}
        {...updateModal}
        onOpenChange={(isOpen) =>
          setUpdateModal((prev) => ({ ...prev, isOpen }))
        }
        updateStatusAction={updateStatusAction}
      />
    </>
  );
}
