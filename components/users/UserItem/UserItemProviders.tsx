import { DeleteUserProvider } from "../DeleteUserProvider";
import { UpdateUserProvider } from "../UpdateUserProvider";
import { UserItemPendingOverlay } from "./UserItemPendingOverlay";

interface UserItemProvidersProps {
  children: React.ReactNode;
}

export function UserItemProviders({ children }: UserItemProvidersProps) {
  return (
    <DeleteUserProvider>
      <UpdateUserProvider>
        <UserItemPendingOverlay>{children}</UserItemPendingOverlay>
      </UpdateUserProvider>
    </DeleteUserProvider>
  );
}
