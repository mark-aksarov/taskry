import { useContext } from "react";
import { useTranslations } from "next-intl";
import { CommentsModal } from "@/components/common/CommentsModal";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

interface TaskCommentsModalProps {
  taskId: number;
}

export function TaskCommentsModal({ taskId }: TaskCommentsModalProps) {
  const t = useTranslations("tasks.TaskCommentsModal");

  const { TaskCommentsContainer } = useGlobalContainer();

  if (!TaskCommentsContainer) {
    throw new Error(
      "TaskCommentsContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <CommentsModal title={t("title")}>
      <TaskCommentsContainer taskId={taskId} />
    </CommentsModal>
  );
}
