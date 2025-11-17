import { CommentsModal } from "@/components/common/CommentsModal";
import { useProjectCommentsContainer } from "../ProjectCommentsContainer";

interface ProjectCommentsModalProps {
  projectId: number;
}

export function ProjectCommentsModal({ projectId }: ProjectCommentsModalProps) {
  const CommentsContainer = useProjectCommentsContainer();

  return (
    <CommentsModal title="Project comments">
      <CommentsContainer projectId={projectId} />
    </CommentsModal>
  );
}
