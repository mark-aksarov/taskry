import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";
import { SendCommentProvider } from "@/components/comments/SendCommentContext";
import { EntityCommentsModal } from "@/components/comments/EntityCommentsModal";
import { UpdateCommentProvider } from "@/components/comments/UpdateCommentContext";
import { useProjectCommentsModal } from "./ProjectCommentsModalContext";

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

  const { isOpen, onOpenChange } = useProjectCommentsModal();

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
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </UpdateCommentProvider>
      </SendCommentProvider>
    </CommentFormProvider>
  );
}
