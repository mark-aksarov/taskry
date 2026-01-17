"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Repeat } from "@/components/common/Repeat";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentsModalForm } from "@/components/comments/CommentsModal";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";
import { CommentsModal } from "@/components/comments/CommentsModal/CommentsModal";

interface ProjectCommentsModalProps {
  projectId: number;
  sendCommentAction: ActionFn<ActionState, FormData>;
}

export function ProjectCommentsModal({
  projectId,
  sendCommentAction,
}: ProjectCommentsModalProps) {
  const t = useTranslations("projects.ProjectCommentsModal");

  const { ProjectCommentsContainer } = useGlobalContainer();

  if (!ProjectCommentsContainer) {
    throw new Error(
      "ProjectCommentsContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <CommentsModal
      title={t("title")}
      commentsContainer={
        <Suspense
          fallback={
            <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
          }
        >
          <ProjectCommentsContainer projectId={projectId} />
        </Suspense>
      }
      commentForm={
        <CommentsModalForm
          sendCommentAction={sendCommentAction}
          mutateUrl={`/api/projects/${projectId}/comments`}
          entityIdInputProps={{ name: "projectId", value: projectId }}
        />
      }
    />
  );
}
