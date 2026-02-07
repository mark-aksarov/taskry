"use client";

import {
  CommentsModal,
  CommentsModalDialog,
  CommentsModalDialogBody,
  CommentsModalDialogFooter,
} from "@/components/comments/CommentsModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentForm } from "@/components/comments/CommentForm";
import { useCommentFormContext } from "@/components/comments/CommentFormContext";

interface ProjectCommentsModalProps {
  projectId: number;
  projectCommentsContainer: React.ReactNode;
  sendCommentAction: ActionFn<ActionState, FormData>;
  updateCommentAction: ActionFn<ActionState, FormData>;
}

export function ProjectCommentsModal({
  projectId,
  projectCommentsContainer,
  sendCommentAction,
  updateCommentAction,
}: ProjectCommentsModalProps) {
  const t = useTranslations("projects.ProjectCommentsModal");

  const context = useCommentFormContext();

  if (context === null) {
    throw new Error(
      "useCommentFormContext must be used within a CommentFormProvider",
    );
  }

  const { editCommentId } = context;

  return (
    <CommentsModal>
      <CommentsModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <CommentsModalDialogBody>
          {projectCommentsContainer}
        </CommentsModalDialogBody>
        <CommentsModalDialogFooter>
          <CommentForm
            sendCommentAction={
              editCommentId ? updateCommentAction : sendCommentAction
            }
            mutateUrl={`/api/projects/${projectId}/comments`}
            hiddenInput={
              <input
                type="hidden"
                name={editCommentId ? "id" : "projectId"}
                value={editCommentId ? editCommentId : projectId}
              />
            }
          />
        </CommentsModalDialogFooter>
      </CommentsModalDialog>
    </CommentsModal>
  );
}
