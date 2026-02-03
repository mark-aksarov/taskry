import {
  UserFormBase,
  UserFormBaseEmailTextField,
  UserFormBasePasswordTextField,
  UserFormBaseFullNameTextField,
} from "../UserFormBase";

import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewUserFormProps {
  formAction: ActionFn<ActionState, FormData>;
}

export function NewUserForm({ formAction }: NewUserFormProps) {
  return (
    <UserFormBase id="new-user-form" formAction={formAction}>
      <UserFormBaseFullNameTextField />
      <UserFormBaseEmailTextField />
      <UserFormBasePasswordTextField />
    </UserFormBase>
  );
}
