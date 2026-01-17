import { RACDialogTrigger } from "../ui";
import { MessageSquare } from "lucide-react";
import { ItemBaseButton } from "../common/ItemBase";
import { TaskCommentsModal } from "./TaskCommentsModal";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface TaskCommentsModalTriggerProps {
  taskId: number;
  commentsCount: number;
  sendCommentAction: ActionFn<ActionState, FormData>;
}

export function TaskCommentsModalTrigger({
  taskId,
  commentsCount,
  sendCommentAction,
}: TaskCommentsModalTriggerProps) {
  return (
    <RACDialogTrigger>
      <ItemBaseButton
        data-test="task-comments-modal-trigger"
        label={commentsCount}
        iconLeft={
          <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />
      <TaskCommentsModal
        taskId={taskId}
        sendCommentAction={sendCommentAction}
      />
    </RACDialogTrigger>
  );
}
