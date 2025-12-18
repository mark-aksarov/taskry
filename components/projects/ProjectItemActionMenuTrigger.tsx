"use client";

import {
  ActionFn,
  DeleteProjectState,
  UpdateProjectStatusState,
} from "@/lib/actions/types";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { useState, startTransition, useActionState } from "react";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { DeleteProjectModal } from "./DeleteProjectModal/DeleteProjectModal";
import { UpdateProjectStatusModal } from "./UpdateProjectStatusModal/UpdateProjectStatusModal";

export type ProjectItemActionMenuTriggerProps = {
  projectId: number;
  projectTitle: string;
  projectStatus: string;
  className?: string;
  deleteAction: ActionFn<DeleteProjectState>;
  updateStatusAction: ActionFn<UpdateProjectStatusState>;
};

const initialState: UpdateProjectStatusState = {
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

  // Delete Project
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Update Status
  const [
    updateProjectStatusState,
    updateProjectStatusAction,
    updateProjectStatusPending,
  ] = useActionState(updateStatusAction, initialState);

  const [isOpenUpdateStatusModal, setIsOpenUpdateStatusModal] = useState(false);
  const [nextStatus, setNextStatus] = useState<string | null>(null);
  const [modalTextKey, setModalTextKey] = useState<
    "complete" | "pause" | "resume" | "noTaskChange"
  >("noTaskChange");

  useActionErrorToast(updateProjectStatusState);

  const handleAction = (key: Key) => {
    const action = key.toString();

    if (action === "delete") {
      setIsOpenDeleteModal(true);
      return;
    }

    // Status is not changing → do nothing
    if (projectStatus === action) return;

    // Project was completed → tasks are not affected
    if (projectStatus === "completed") {
      startTransition(() => {
        updateProjectStatusAction({ id: projectId, nextStatus: action });
      });
      return;
    }

    // Decide modal text
    if (action === "completed") {
      setModalTextKey("complete");
    } else if (projectStatus === "active" && action === "pending") {
      setModalTextKey("pause");
    } else if (projectStatus === "pending" && action === "active") {
      setModalTextKey("resume");
    } else {
      setModalTextKey("noTaskChange");
    }

    setNextStatus(action);
    setIsOpenUpdateStatusModal(true);
  };

  return (
    <>
      <ItemBaseActionMenuTrigger className={className} onAction={handleAction}>
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

      <DeleteProjectModal
        projectId={projectId}
        projectTitle={projectTitle}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
      />

      <UpdateProjectStatusModal
        projectId={projectId}
        nextStatus={nextStatus!}
        modalTextKey={modalTextKey}
        isOpen={isOpenUpdateStatusModal}
        onOpenChange={setIsOpenUpdateStatusModal}
        updateStatusAction={updateStatusAction}
      />
    </>
  );
}
