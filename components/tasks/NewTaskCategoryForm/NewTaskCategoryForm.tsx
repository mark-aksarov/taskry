import { ActionFn, ActionState } from "@/lib/actions/types";
import { TaskCategoryFormBase } from "../TaskCategoryFormBase";

interface NewTaskCategoryFormProps {
  formAction: ActionFn<ActionState, FormData>;
}

export function NewTaskCategoryForm({ formAction }: NewTaskCategoryFormProps) {
  return <TaskCategoryFormBase formAction={formAction} />;
}
