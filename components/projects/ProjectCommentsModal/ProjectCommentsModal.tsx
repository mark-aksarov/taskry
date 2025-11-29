import { Suspense, useContext } from "react";
import { Repeat } from "@/components/common/Repeat";
import { CommentsModal } from "@/components/common/CommentsModal";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { ProjectCommentsClientContainerContext } from "../ProjectCommentsClientContainer";
import { useTranslations } from "next-intl";

interface ProjectCommentsModalProps {
  projectId: number;
}

export function ProjectCommentsModal({ projectId }: ProjectCommentsModalProps) {
  const t = useTranslations("projects.ProjectCommentsModal");

  const CommentsContainer = useContext(ProjectCommentsClientContainerContext);

  return (
    <CommentsModal title={t("title")}>
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
