import { RACDialogTrigger } from "../ui";
import { MessageSquare } from "lucide-react";
import { ItemBaseButton } from "../common/ItemBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectCommentsModal } from "./ProjectCommentsModal";

interface ProjectCommentsModalTriggerProps {
  projectId: number;
  commentsCount: number;
  sendCommentAction: ActionFn<ActionState, FormData>;
}

export function ProjectCommentsModalTrigger({
  projectId,
  commentsCount,
  sendCommentAction,
}: ProjectCommentsModalTriggerProps) {
  return (
    <RACDialogTrigger>
      <ItemBaseButton
        data-test="project-comments-modal-trigger"
        label={commentsCount}
        iconLeft={
          <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />
      <ProjectCommentsModal
        projectId={projectId}
        sendCommentAction={sendCommentAction}
      />
    </RACDialogTrigger>
  );
}
