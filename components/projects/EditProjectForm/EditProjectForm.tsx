import { DateValue } from "react-aria";
import { ProjectFormBase } from "../ProjectFormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface EditProjectFormProps {
  projectId: number;
  projectTitleDefaultValue?: string;
  projectDescriptionDefaultValue?: string;
  projectDeadlineDefaultValue?: DateValue;
  projectStatusSelect: React.ReactNode;
  projectCategorySelect: React.ReactNode;
  projectCustomerSelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function EditProjectForm({
  projectId,
  projectTitleDefaultValue,
  projectDescriptionDefaultValue,
  projectDeadlineDefaultValue,
  projectStatusSelect,
  projectCategorySelect,
  projectCustomerSelect,
  formAction,
}: EditProjectFormProps) {
  return (
    <ProjectFormBase
      projectId={projectId}
      projectTitleDefaultValue={projectTitleDefaultValue}
      projectDescriptionDefaultValue={projectDescriptionDefaultValue}
      projectDeadlineDefaultValue={projectDeadlineDefaultValue}
      projectStatusSelect={projectStatusSelect}
      projectCategorySelect={projectCategorySelect}
      projectCustomerSelect={projectCustomerSelect}
      formAction={formAction}
    />
  );
}
