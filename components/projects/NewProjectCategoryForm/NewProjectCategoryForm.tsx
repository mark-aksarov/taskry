import { ActionFn, CreateProjectState } from "@/lib/actions/types";
import { ProjectCategoryFormBase } from "../ProjectCategoryFormBase";

interface NewProjectCategoryFormProps {
  formAction: ActionFn<CreateProjectState, FormData>;
}

export function NewProjectCategoryForm({
  formAction,
}: NewProjectCategoryFormProps) {
  return <ProjectCategoryFormBase formAction={formAction} />;
}
