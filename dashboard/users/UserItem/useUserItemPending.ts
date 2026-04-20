import { useDeleteUser } from "../DeleteUserContext";
import { useUpdateUser } from "../UpdateUserContext";

export function useUserItemPending() {
  const { isPending: isDeleteUserPending } = useDeleteUser();
  const { isPending: isUpdateUserPending } = useUpdateUser();

  const isPending = isDeleteUserPending || isUpdateUserPending;

  return isPending;
}
