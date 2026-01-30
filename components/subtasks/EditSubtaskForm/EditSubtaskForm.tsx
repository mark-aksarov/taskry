"use client";

import { SubtaskFormBase, SubtaskFormBaseProps } from "../SubtaskFormBase";

interface EditSubtaskFormProps extends Omit<SubtaskFormBaseProps, "id"> {
  taskId: number;
}

export function EditSubtaskForm(props: EditSubtaskFormProps) {
  return <SubtaskFormBase id="edit-subtask-form" {...props} />;
}
