import {
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";

import { memo } from "react";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { DeleteSubtaskProvider } from "../DeleteSubtaskContext";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { SubtaskItemDeleteOverlay } from "../SubtaskItemDeleteOverlay";

interface SubtaskListItemProps {
  id: number;
  text: string;
  isDone: boolean;
  taskId: number;
  toggleSubtask: ActionFn<ActionState, ToggleSubtaskPayload>;
  updateSubtask: ActionFn<ActionState, FormData>;
  deleteSubtask: ActionFn<ActionState, number>;
  mutate?: () => void;
}

export function SubtaskListItem({
  deleteSubtask,
  ...props
}: SubtaskListItemProps) {
  return (
    <DeleteSubtaskProvider deleteSubtask={deleteSubtask}>
      <SubtaskItemDeleteOverlay>
        <SubtaskListItemInner {...props} />
      </SubtaskItemDeleteOverlay>
    </DeleteSubtaskProvider>
  );
}

const SubtaskListItemInner = memo(
  ({
    id,
    text,
    isDone,
    taskId,
    toggleSubtask,
    updateSubtask,
    mutate,
  }: Omit<SubtaskListItemProps, "deleteSubtask">) => {
    return (
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <Check
            size={16}
            className={twMerge(
              "mt-0.5 shrink-0",
              isDone && "text-blue-600 dark:text-blue-700",
              !isDone && "text-gray-500 dark:text-gray-400",
            )}
          />
          <SubtaskActionMenuTrigger
            subtaskId={id}
            isDone={isDone}
            subtaskText={text}
            toggleSubtask={toggleSubtask}
            mutate={mutate}
            editSubtaskForm={
              <EditSubtaskForm
                taskId={taskId}
                subtaskId={id}
                updateSubtask={updateSubtask}
                textDefaultValue={text}
                mutate={mutate}
              />
            }
          />
        </div>
      </div>
    );
  },
);
