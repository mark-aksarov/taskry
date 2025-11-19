import { useContext } from "react";
import { CommentsModal } from "@/components/common/CommentsModal";
import { ProjectCommentsClientContainerContext } from "../ProjectCommentsClientContainer";

interface ProjectCommentsModalProps {
  projectId: number;
}

export function ProjectCommentsModal({ projectId }: ProjectCommentsModalProps) {
  const CommentsContainer = useContext(ProjectCommentsClientContainerContext);

  return (
    <CommentsModal title="Project comments">
      <CommentsContainer projectId={projectId} />
    </CommentsModal>
  );
}
