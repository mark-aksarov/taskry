"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { ProjectSelect } from "../../projects/ProjectSelect";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useUpdateTaskProject } from "../UpdateTaskProjectContext";

interface UpdateTaskProjectFormProps {
  taskId: number;
  projectId?: number;
  projectSelectItems: { id: number; title: string }[];
}

export function UpdateTaskProjectForm({
  taskId,
  projectId,
  projectSelectItems,
}: UpdateTaskProjectFormProps) {
  const { state, isPending, action } = useUpdateTaskProject();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-task-project-form" onSubmit={handleSubmit}>
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <ProjectSelect
        defaultSelectedKey={projectId?.toString()}
        items={projectSelectItems}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
