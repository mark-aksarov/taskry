"use client";

import { NewSubtaskModal } from "../NewSubtaskModal";
import { DialogTrigger } from "react-aria-components";
import { NewSubtasksButton } from "../NewSubtaskButton";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewSubtaskModalTriggerProps {
  taskId: number;
  createSubtask: ActionFn<ActionState, FormData>;
  mutate?: () => void;
}

export function NewSubtaskModalTrigger({
  taskId,
  createSubtask,
  mutate,
}: NewSubtaskModalTriggerProps) {
  return (
    <DialogTrigger>
      <NewSubtasksButton />
      <NewSubtaskModal
        taskId={taskId}
        createSubtask={createSubtask}
        mutate={mutate}
      />
    </DialogTrigger>
  );
}
