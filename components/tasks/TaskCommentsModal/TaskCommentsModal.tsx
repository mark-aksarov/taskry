import { useContext } from "react";
import { useTranslations } from "next-intl";
import { CommentsModal } from "@/components/common/CommentsModal";
import { TaskCommentsContainerContext } from "../TaskCommentsContainer";

interface TaskCommentsModalProps {
  taskId: number;
}

export function TaskCommentsModal({ taskId }: TaskCommentsModalProps) {
  const CommentsContainer = useContext(TaskCommentsContainerContext);
  const t = useTranslations("tasks.TaskCommentsModal");

  return (
    <CommentsModal title={t("title")}>
      <CommentsContainer taskId={taskId} />
    </CommentsModal>
  );
}
