import { UserFormBase, UserFormBaseProps } from "../UserFormBase";

export function EditUserForm(props: Omit<UserFormBaseProps, "id">) {
  return <UserFormBase id="edit-user-form" {...props} />;
}
