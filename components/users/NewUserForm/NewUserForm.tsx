import { UserFormBase, UserFormBaseProps } from "../UserFormBase";

export function NewUserForm(props: Omit<UserFormBaseProps, "id">) {
  return (
    <UserFormBase
      id="new-user-form"
      showPasswordTextField={true}
      showEmailTextField={true}
      {...props}
    />
  );
}
