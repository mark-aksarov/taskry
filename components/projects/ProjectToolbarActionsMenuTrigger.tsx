"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { BulkDeleteEntityModal } from "../common/BulkDeleteEntityModal";
import { BulkUpdateProjectStatusModal } from "./BulkUpdateProjectStatusModal";
import { useExtractCheckedItemIds } from "@/lib/hooks/useExtractCheckedItemIds";

interface ProjectToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

interface DeleteModalState {
  projectIds: number[];
  isOpen: boolean;
}

interface UpdateStatusModalState {
  projectIds: number[];
  isOpen: boolean;
  nextStatus: string;
}

export const ProjectToolbarActionsMenuTrigger = ({
  deleteAction,
  updateStatusAction,
}: ProjectToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("projects.ProjectToolbarActionsMenuTrigger");
  const extractCheckedItemIds =
    useExtractCheckedItemIds<number>("project-checkbox-");

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    projectIds: [],
    isOpen: false,
  });

  const [updateModal, setUpdateModal] = useState<UpdateStatusModalState>({
    projectIds: [],
    isOpen: false,
    nextStatus: "complete",
  });

  const handleAction = (key: Key) => {
    const ids = extractCheckedItemIds();

    if (key === "delete") {
      setDeleteModal({
        projectIds: ids,
        isOpen: true,
      });
    } else {
      setUpdateModal({
        projectIds: ids,
        isOpen: true,
        nextStatus: key.toString(),
      });
    }
  };

  return (
    <>
      <ToolbarActionsMenuTrigger onAction={handleAction}>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
        <Item textValue={t("pending")} key="pending">
          <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("pending")}
        </Item>
        <Item textValue={t("active")} key="active">
          <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("active")}
        </Item>
        <Item textValue={t("completed")} key="completed">
          <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("completed")}
        </Item>
      </ToolbarActionsMenuTrigger>

      <BulkDeleteEntityModal
        entityIds={deleteModal.projectIds}
        isOpen={deleteModal.isOpen}
        onOpenChange={(isOpen) =>
          setDeleteModal((prev) => ({ ...prev, isOpen }))
        }
        translationNamespace="projects.BulkDeleteProjectModal"
        deleteAction={deleteAction}
      />

      <BulkUpdateProjectStatusModal
        projectIds={updateModal.projectIds}
        nextStatus={updateModal.nextStatus}
        isOpen={updateModal.isOpen}
        onOpenChange={(open) =>
          setUpdateModal((prev) => ({ ...prev, isOpen: open }))
        }
        updateStatusAction={updateStatusAction}
      />
    </>
  );
};
