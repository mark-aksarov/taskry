import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useState, startTransition } from "react";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { DeleteProjectActionState } from "@/lib/actions/types";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { DeleteProjectModal } from "./DeleteProjectModal/DeleteProjectModal";

export type ProjectItemActionMenuTriggerProps = {
  projectId: number;
  projectTitle: string;
  className?: string;
  deleteProjectAction: (
    prevState: any,
    id: number,
  ) => Promise<DeleteProjectActionState>;
  updateStatusAction: (id: number, status: string) => void;
};

export function ProjectItemActionMenuTrigger({
  projectId,
  projectTitle,
  className,
  deleteProjectAction,
  updateStatusAction,
}: ProjectItemActionMenuTriggerProps) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const t = useTranslations("projects.ProjectItemActionMenuTrigger");

  const handleAction = async (key: Key) => {
    const action = key.toString();

    if (action === "delete") {
      setIsOpenDeleteModal(true);
    } else {
      startTransition(() => updateStatusAction(projectId, action));
    }
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
        <Item textValue={t("markDone")} key="done">
          <Check size={16} /> {t("markDone")}
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
        deleteProjectAction={deleteProjectAction}
      />
    </>
  );
}
