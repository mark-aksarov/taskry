import {
  DeleteProjectActionState,
  UpdateProjectStatusState,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { useState, startTransition, useActionState } from "react";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { DeleteProjectModal } from "./DeleteProjectModal/DeleteProjectModal";

export type ProjectItemActionMenuTriggerProps = {
  projectId: number;
  projectTitle: string;
  className?: string;
  deleteAction: (
    prevState: any,
    id: number,
  ) => Promise<DeleteProjectActionState>;
  updateStatusAction: (
    prevState: any,
    { id, statusId }: UpdateProjectStatusPayload,
  ) => Promise<UpdateProjectStatusState>;
};

const initialState: UpdateProjectStatusState = {
  status: null,
  message: null,
};

export function ProjectItemActionMenuTrigger({
  projectId,
  projectTitle,
  className,
  deleteAction,
  updateStatusAction,
}: ProjectItemActionMenuTriggerProps) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [state, updateProjectStatusAction, pending] = useActionState(
    updateStatusAction,
    initialState,
  );

  const t = useTranslations("projects.ProjectItemActionMenuTrigger");

  const handleAction = async (key: Key) => {
    const action = key.toString();

    if (action === "delete") {
      setIsOpenDeleteModal(true);
    } else {
      startTransition(() =>
        updateProjectStatusAction({
          id: projectId,
          statusId: action as "active" | "completed" | "pending",
        }),
      );
    }
  };

  useActionErrorToast(state);

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
    </>
  );
}
