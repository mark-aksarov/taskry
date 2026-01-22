import {
  CommentsModal,
  CommentsModalDialog,
  CommentsModalDialogBody,
  CommentsModalDialogFooter,
  CommentsModalDialogHeader,
} from "@/components/comments/CommentsModal";

import {
  CommentFormProvider,
  useCommentFormContext,
} from "@/components/comments/CommentFormContext";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentForm } from "@/components/comments/CommentForm";
import { CommentButton } from "@/components/comments/CommentButton";

interface ProjectCommentsModalTriggerProps {
  projectId: number;
  commentsCount: number;
  projectCommentsContainer: React.ReactNode;
  sendCommentAction: ActionFn<ActionState, FormData>;
  updateCommentAction: ActionFn<ActionState, FormData>;
}

export function ProjectCommentsModalTrigger(
  props: ProjectCommentsModalTriggerProps,
) {
  return (
    <CommentFormProvider>
      <ProjectCommentsModalTriggerInner {...props} />
    </CommentFormProvider>
  );
}

function ProjectCommentsModalTriggerInner({
  projectId,
  commentsCount,
  projectCommentsContainer,
  sendCommentAction,
  updateCommentAction,
}: ProjectCommentsModalTriggerProps) {
  const t = useTranslations("projects.ProjectCommentsModal");

  const { editCommentId } = useCommentFormContext();

  return (
    <DialogTrigger>
      <CommentButton
        data-test="project-comments-modal-trigger"
        label={commentsCount}
      />

      <CommentsModal>
        <CommentsModalDialog>
          <CommentsModalDialogHeader>{t("title")}</CommentsModalDialogHeader>
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
    </DialogTrigger>
  );
}
