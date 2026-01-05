import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Repeat } from "@/components/common/Repeat";
import { CommentsModal } from "@/components/common/CommentsModal";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

interface ProjectCommentsModalProps {
  projectId: number;
}

export function ProjectCommentsModal({ projectId }: ProjectCommentsModalProps) {
  const t = useTranslations("projects.ProjectCommentsModal");

  const { ProjectCommentsContainer } = useGlobalContainer();

  if (!ProjectCommentsContainer) {
    throw new Error(
      "ProjectCommentsContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <CommentsModal title={t("title")}>
      <Suspense
        fallback={
          <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
        }
      >
        <ProjectCommentsContainer projectId={projectId} />
      </Suspense>
    </CommentsModal>
  );
}
