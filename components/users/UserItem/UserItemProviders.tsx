import { DeleteUserProvider } from "../DeleteUserContext";
import { UpdateUserProvider } from "../UpdateUserProvider";
import { UserItemPendingOverlay } from "./UserItemPendingOverlay";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";

interface UserItemProvidersProps {
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
  children: React.ReactNode;
}

export function UserItemProviders({
  deleteUser,
  children,
}: UserItemProvidersProps) {
  return (
    <DeleteUserProvider deleteUser={deleteUser}>
      <UpdateUserProvider>
        <UserItemPendingOverlay>{children}</UserItemPendingOverlay>
      </UpdateUserProvider>
    </DeleteUserProvider>
  );
}
