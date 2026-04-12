"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskCategorySelect } from "../../taskCategory/TaskCategorySelect";
import { useUpdateTaskCategoryForTask } from "../UpdateTaskCategoryForTaskContext";

interface UpdateTaskCategoryForTaskFormProps {
  taskId: number;
  categoryId?: number;
  taskCategorySelectItems: { id: number; name: string }[];
}

export function UpdateTaskCategoryForTaskForm({
  taskId,
  categoryId,
  taskCategorySelectItems,
}: UpdateTaskCategoryForTaskFormProps) {
  const { state, isPending, action } = useUpdateTaskCategoryForTask();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-task-category-for-task-form" onSubmit={handleSubmit}>
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <TaskCategorySelect
        defaultSelectedKey={categoryId?.toString()}
        items={taskCategorySelectItems}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
