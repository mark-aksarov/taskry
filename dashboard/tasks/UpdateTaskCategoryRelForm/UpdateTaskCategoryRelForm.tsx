"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { TaskCategorySelect } from "../../taskCategory/TaskCategorySelect";
import { useUpdateTaskCategoryRel } from "../UpdateTaskCategoryRelContext";

interface UpdateTaskCategoryRelFormProps {
  taskId: number;
  categoryId?: number;
  taskCategorySelectItems: { id: number; name: string }[];
}

export function UpdateTaskCategoryRelForm({
  taskId,
  categoryId,
  taskCategorySelectItems,
}: UpdateTaskCategoryRelFormProps) {
  const { state, isPending, action } = useUpdateTaskCategoryRel();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-task-category-rel-form" onSubmit={handleSubmit}>
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
