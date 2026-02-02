import { UserFormBase, UserFormBaseProps } from "../UserFormBase";
import { UserFormBasePasswordTextField } from "../UserFormBase/UserFormBasePasswordTextField";

export function NewUserForm(props: Omit<UserFormBaseProps, "id">) {
  return (
    <UserFormBase
      id="new-user-form"
      passwordTextField={<UserFormBasePasswordTextField />}
      {...props}
    />
  );
}
