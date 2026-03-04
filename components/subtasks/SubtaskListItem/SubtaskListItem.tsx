"use client";

import {
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";

import { memo } from "react";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { DeleteSubtaskProvider } from "../DeleteSubtaskContext";
import { UpdateSubtaskProvider } from "../UpdateSubtaskContext";
import { ToggleSubtaskProvider } from "../ToggleSubtaskContext";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { SubtaskListItemPendingOverlay } from "./SubtaskListItemPendingOverlay";

interface SubtaskListItemProps {
  id: number;
  text: string;
  isDone: boolean;
  taskId: number;
  toggleSubtask: ActionFn<ActionState, ToggleSubtaskPayload>;
  updateSubtask: ActionFn<ActionState, FormData>;
  deleteSubtask: ActionFn<ActionState, number>;
}

export function SubtaskListItem({
  toggleSubtask,
  updateSubtask,
  deleteSubtask,
  ...props
}: SubtaskListItemProps) {
  return (
    <DeleteSubtaskProvider taskId={props.taskId} deleteSubtask={deleteSubtask}>
      <UpdateSubtaskProvider
        taskId={props.taskId}
        updateSubtask={updateSubtask}
      >
        <ToggleSubtaskProvider
          taskId={props.taskId}
          toggleSubtask={toggleSubtask}
        >
          <SubtaskListItemPendingOverlay>
            <SubtaskListItemInner {...props} />
          </SubtaskListItemPendingOverlay>
        </ToggleSubtaskProvider>
      </UpdateSubtaskProvider>
    </DeleteSubtaskProvider>
  );
}

const SubtaskListItemInner = memo(
  ({
    id,
    text,
    isDone,
    taskId,
  }: Omit<
    SubtaskListItemProps,
    "toggleSubtask" | "updateSubtask" | "deleteSubtask"
  >) => {
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
          />
        </div>
      </div>
    );
  },
);
