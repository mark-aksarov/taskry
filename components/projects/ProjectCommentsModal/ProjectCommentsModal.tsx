import { Suspense, useContext } from "react";
import { Repeat } from "@/components/common/Repeat";
import { CommentsModal } from "@/components/common/CommentsModal";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { ProjectCommentsClientContainerContext } from "../ProjectCommentsClientContainer";

interface ProjectCommentsModalProps {
  projectId: number;
}

export function ProjectCommentsModal({ projectId }: ProjectCommentsModalProps) {
  const CommentsContainer = useContext(ProjectCommentsClientContainerContext);

  return (
    <CommentsModal title="Project comments">
      <Suspense
        fallback={
          <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
        }
      >
        <CommentsContainer projectId={projectId} />
      </Suspense>
    </CommentsModal>
  );
}
