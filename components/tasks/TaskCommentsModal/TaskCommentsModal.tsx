import { useContext } from "react";
import { useTranslations } from "next-intl";
import { CommentsModal } from "@/components/common/CommentsModal";
import { TaskCommentsClientContainerContext } from "../TaskCommentsClientContainer";

interface TaskCommentsModalProps {
  taskId: number;
}

export function TaskCommentsModal({ taskId }: TaskCommentsModalProps) {
  const CommentsContainer = useContext(TaskCommentsClientContainerContext);
  const t = useTranslations("tasks.TaskCommentsModal");

  return (
    <CommentsModal title={t("title")}>
      <CommentsContainer taskId={taskId} />
    </CommentsModal>
  );
}
