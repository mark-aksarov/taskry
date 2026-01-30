"use client";

import { NewSubtaskModal } from "../NewSubtaskModal";
import { DialogTrigger } from "react-aria-components";
import { NewSubtasksButton } from "../NewSubtaskButton";

interface NewSubtaskModalTriggerProps {
  newSubtaskForm: React.ReactNode;
}

export function NewSubtaskModalTrigger({
  newSubtaskForm,
}: NewSubtaskModalTriggerProps) {
  return (
    <DialogTrigger>
      <NewSubtasksButton />
      <NewSubtaskModal newSubtaskForm={newSubtaskForm} />
    </DialogTrigger>
  );
}
