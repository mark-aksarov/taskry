"use client";

import { SubtaskFormBase, SubtaskFormBaseProps } from "../SubtaskFormBase";

interface NewSubtaskFormProps extends Omit<SubtaskFormBaseProps, "id"> {
  taskId: number;
}

export function NewSubtaskForm(props: NewSubtaskFormProps) {
  return <SubtaskFormBase id="new-subtask-form" {...props} />;
}
