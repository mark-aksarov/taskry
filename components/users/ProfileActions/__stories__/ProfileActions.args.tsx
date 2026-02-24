import { EditUserForm } from "../../EditUserForm";
import { editUserFormArgs } from "../../EditUserForm/__stories__";

export const profileActionsArgs = {
  guestMode: false,
  userId: "user-1",
  changePassword: () => ({ status: "success" as const }),
  editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
};
