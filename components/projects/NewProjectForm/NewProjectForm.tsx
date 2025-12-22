import { ProjectFormBase } from "../ProjectFormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewProjectFormProps {
  projectStatusSelect: React.ReactNode;
  projectCategorySelect: React.ReactNode;
  projectCustomerSelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function NewProjectForm({
  projectStatusSelect,
  projectCategorySelect,
  projectCustomerSelect,
  formAction,
}: NewProjectFormProps) {
  return (
    <ProjectFormBase
      id="new-project-form"
      projectStatusSelect={projectStatusSelect}
      projectCategorySelect={projectCategorySelect}
      projectCustomerSelect={projectCustomerSelect}
      formAction={formAction}
    />
  );
}
