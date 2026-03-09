import { DeleteUserProvider } from "../DeleteUserContext";
import { UpdateUserProvider } from "../UpdateUserContext";
import { UserItemPendingOverlay } from "./UserItemPendingOverlay";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";

interface UserItemProvidersProps {
  updateUser: ActionFn<ActionState, FormData>;
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
  children: React.ReactNode;
}

export function UserItemProviders({
  updateUser,
  deleteUser,
  children,
}: UserItemProvidersProps) {
  return (
    <DeleteUserProvider deleteUser={deleteUser}>
      <UpdateUserProvider updateUser={updateUser}>
        <UserItemPendingOverlay>{children}</UserItemPendingOverlay>
      </UpdateUserProvider>
    </DeleteUserProvider>
  );
}
