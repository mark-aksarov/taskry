"use client";

import { DialogTrigger } from "react-aria-components";
import { SubtaskFormModal } from "../SubtaskFormModal";
import { NewSubtasksButton } from "../NewSubtaskButton";
import { NewSubtaskFormDialog } from "../NewSubtaskFormDialog";

interface NewSubtaskModalTriggerProps {
  newSubtaskFormContainer: React.ReactNode;
}

export function NewSubtaskModalTrigger({
  newSubtaskFormContainer,
}: NewSubtaskModalTriggerProps) {
  return (
    <DialogTrigger>
      <NewSubtasksButton className="max-md:hidden" />
      <SubtaskFormModal>
        <NewSubtaskFormDialog>{newSubtaskFormContainer}</NewSubtaskFormDialog>
      </SubtaskFormModal>
    </DialogTrigger>
  );
}
