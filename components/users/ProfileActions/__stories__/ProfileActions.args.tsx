import { EditUserForm } from "../../EditUserForm";
import { editUserFormArgs } from "../../EditUserForm/__stories__";

export const profileActionsArgs = {
  userId: "user-1",
  changePassword: () => ({ status: "success" as const }),
  editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
};
