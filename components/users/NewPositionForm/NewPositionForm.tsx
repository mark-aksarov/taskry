import { PositionFormBase } from "../PositionFormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewPositionFormProps {
  formAction: ActionFn<ActionState, FormData>;
}

export function NewPositionForm({ formAction }: NewPositionFormProps) {
  return (
    <PositionFormBase formId="new-position-form" formAction={formAction} />
  );
}
