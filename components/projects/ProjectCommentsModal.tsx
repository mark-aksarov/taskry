import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EntityCommentsModal } from "@/components/comments/EntityCommentsModal";

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
    <EntityCommentsModal
      entityId={projectId}
      entityKey="projectId"
      mutateUrl={`/api/projects/${projectId}/comments`}
      title={t("title")}
      commentsContainer={projectCommentsContainer}
      sendComment={sendComment}
      updateComment={updateComment}
    />
  );
}
