"use client";

import {
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";

import { memo } from "react";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { SubtaskListItemPendingOverlay } from "./SubtaskListItemPendingOverlay";
import { DeleteSubtaskTransitionProvider } from "../DeleteSubtaskTransitionContext";
import { UpdateSubtaskTransitionProvider } from "../UpdateSubtaskTransitionContext";
import { ToggleSubtaskTransitionProvider } from "../ToggleSubtaskTransitionContext";

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

export function SubtaskListItem(props: SubtaskListItemProps) {
  return (
    <DeleteSubtaskTransitionProvider>
      <UpdateSubtaskTransitionProvider>
        <ToggleSubtaskTransitionProvider>
          <SubtaskListItemPendingOverlay>
            <SubtaskListItemInner {...props} />
          </SubtaskListItemPendingOverlay>
        </ToggleSubtaskTransitionProvider>
      </UpdateSubtaskTransitionProvider>
    </DeleteSubtaskTransitionProvider>
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
    deleteSubtask,
    mutate,
  }: SubtaskListItemProps) => {
    return (
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <Check
            size={16}
            className={twMerge(
              "mt-0.5 shrink-0",
              isDone && "text-blue-600 dark:text-blue-400",
              !isDone && "text-gray-500 dark:text-gray-400",
            )}
          />
          <SubtaskActionMenuTrigger
            taskId={taskId}
            subtaskId={id}
            isDone={isDone}
            subtaskText={text}
            toggleSubtask={toggleSubtask}
            updateSubtask={updateSubtask}
            deleteSubtask={deleteSubtask}
            mutate={mutate}
          />
        </div>
      </div>
    );
  },
);
