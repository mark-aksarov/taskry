import { useDeleteUserTransition } from "../DeleteUserTransitionContext";
import { useUpdateUserTransition } from "../UpdateUserTransitionContext";

export function useUserItemPending() {
  const { isPending: isDeleteUserPending } = useDeleteUserTransition();
  const { isPending: isUpdateUserPending } = useUpdateUserTransition();

  const isPending = isDeleteUserPending || isUpdateUserPending;

  return isPending;
}
