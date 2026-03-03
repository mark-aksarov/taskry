import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentFormProvider } from "../comments/CommentFormContext";
import { SendCommentProvider } from "../comments/SendCommentContext";
import { EntityCommentsModal } from "../comments/EntityCommentsModal";
import { UpdateCommentProvider } from "../comments/UpdateCommentContext";

interface ProjectCommentsModalProps {
  projectId: number;
  projectCommentsContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
}

export function ProjectCommentsModal({
  projectId,
  projectCommentsContainer,
  sendComment,
  updateComment,
}: ProjectCommentsModalProps) {
  const t = useTranslations("projects.ProjectCommentsModal");

  return (
    <CommentFormProvider
      entityId={projectId}
      entityKey="projectId"
      mutateUrl={`/api/projects/${projectId}/comments`}
    >
      <SendCommentProvider sendComment={sendComment}>
        <UpdateCommentProvider updateComment={updateComment}>
          <EntityCommentsModal
            title={t("title")}
            commentsContainer={projectCommentsContainer}
          />
        </UpdateCommentProvider>
      </SendCommentProvider>
    </CommentFormProvider>
  );
}
