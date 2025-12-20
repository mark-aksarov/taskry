import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectCategoryFormBase } from "../ProjectCategoryFormBase";

interface NewProjectCategoryFormProps {
  formAction: ActionFn<ActionState, FormData>;
}

export function NewProjectCategoryForm({
  formAction,
}: NewProjectCategoryFormProps) {
  return <ProjectCategoryFormBase formAction={formAction} />;
}
