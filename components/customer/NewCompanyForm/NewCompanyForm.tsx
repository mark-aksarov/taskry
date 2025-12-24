import { CompanyFormBase } from "../CompanyFormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewCompanyFormProps {
  formAction: ActionFn<ActionState, FormData>;
}

export function NewCompanyForm({ formAction }: NewCompanyFormProps) {
  return <CompanyFormBase formId="new-company-form" formAction={formAction} />;
}
