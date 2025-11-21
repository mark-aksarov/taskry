"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { FormBaseModal } from "../common/FormBaseModal";

interface NewTaskModalTriggerProps {
  newTaskForm: React.ReactNode;
}

export function NewTaskModalTrigger({ newTaskForm }: NewTaskModalTriggerProps) {
  return (
    <DialogTrigger>
      <Button
        label="New Task"
        iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <FormBaseModal
        title="New Task"
        form={newTaskForm}
        submitButtonLabel="Create Task"
      />
    </DialogTrigger>
  );
}
