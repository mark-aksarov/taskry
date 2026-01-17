"use client";

import {
  CommentsModal,
  CommentsModalForm,
} from "@/components/comments/CommentsModal";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Repeat } from "@/components/common/Repeat";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

interface TaskCommentsModalProps {
  taskId: number;
  sendCommentAction: ActionFn<ActionState, FormData>;
}

export function TaskCommentsModal({
  taskId,
  sendCommentAction,
}: TaskCommentsModalProps) {
  const t = useTranslations("tasks.TaskCommentsModal");

  const { TaskCommentsContainer } = useGlobalContainer();

  if (!TaskCommentsContainer) {
    throw new Error(
      "TaskCommentsContainer is missing in GlobalContainerContext",
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
          <TaskCommentsContainer taskId={taskId} />
        </Suspense>
      }
      commentForm={
        <CommentsModalForm
          sendCommentAction={sendCommentAction}
          mutateUrl={`/api/tasks/${taskId}/comments`}
          entityIdInputProps={{ name: "taskId", value: taskId }}
        />
      }
    />
  );
}
