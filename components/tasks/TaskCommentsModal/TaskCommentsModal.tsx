import { CommentsModal } from "@/components/common/CommentsModal";
import { TaskCommentsClientContainerContext } from "../TaskCommentsClientContainer";
import { useContext } from "react";

interface TaskCommentsModalProps {
  taskId: number;
}

export function TaskCommentsModal({ taskId }: TaskCommentsModalProps) {
  const CommentsContainer = useContext(TaskCommentsClientContainerContext);

  return (
    <CommentsModal title="Task comments">
      <CommentsContainer taskId={taskId} />
    </CommentsModal>
  );
}
