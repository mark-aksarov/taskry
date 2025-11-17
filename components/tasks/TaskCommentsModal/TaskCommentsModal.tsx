import { CommentsModal } from "@/components/common/CommentsModal";
import { useTaskCommentsContainer } from "../TaskCommentsContainer";

interface TaskCommentsModalProps {
  taskId: number;
}

export function TaskCommentsModal({ taskId }: TaskCommentsModalProps) {
  const CommentsContainer = useTaskCommentsContainer();

  return (
    <CommentsModal title="Task comments">
      <CommentsContainer taskId={taskId} />
    </CommentsModal>
  );
}
