import { DeleteUserProvider } from "../DeleteUserProvider";
import { UpdateUserProvider } from "../UpdateUserProvider";
import { UpdateUserModalProvider } from "../UpdateUserModal";
import { DeleteUserModalProvider } from "../DeleteUserModal";
import { UserDetailModalProvider } from "../UserDetailModal";

interface UserItemProvidersProps {
  children: React.ReactNode;
}

export function UserItemProviders({ children }: UserItemProvidersProps) {
  return (
    <UserDetailModalProvider>
      <DeleteUserModalProvider>
        <DeleteUserProvider>
          <UpdateUserModalProvider>
            <UpdateUserProvider>{children}</UpdateUserProvider>
          </UpdateUserModalProvider>
        </DeleteUserProvider>
      </DeleteUserModalProvider>
    </UserDetailModalProvider>
  );
}
