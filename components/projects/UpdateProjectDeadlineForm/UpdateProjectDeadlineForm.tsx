"use client";

import { startTransition } from "react";
import { CalendarDate } from "@internationalized/date";
import { FormBase } from "@/components/common/FormBase";
import { ProjectDeadlineDatePicker } from "../ProjectDeadlineDatePicker";
import { useUpdateProjectDeadline } from "../UpdateProjectDeadlineContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateProjectDeadlineFormProps {
  projectId: number;
  deadline: string;
}

export function UpdateProjectDeadlineForm({
  projectId,
  deadline,
}: UpdateProjectDeadlineFormProps) {
  const { state, action, isPending } = useUpdateProjectDeadline();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  const d = new Date(deadline);
  const deadlineValue = new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  );

  return (
    <FormBase id="update-project-deadline-form" onSubmit={handleSubmit}>
      {projectId && <input type="hidden" name="id" value={projectId} />}
      <ProjectDeadlineDatePicker
        defaultValue={deadlineValue}
        matchTriggerWidth={false}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
