import { UpdateUserModalProvider } from "../../UpdateUserModal";
import { UserDetailModalProvider } from "../../UserDetailModal";
import { MockedDeleteUserProvider } from "../../DeleteUserProvider/__stories__";
import { MockedUpdateUserProvider } from "../../UpdateUserProvider/__stories__";
import { DeleteUserModalProvider } from "../../DeleteUserModal/DeleteUserModalContext";

export function MockedUserItemProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserDetailModalProvider>
      <DeleteUserModalProvider>
        <MockedDeleteUserProvider>
          <UpdateUserModalProvider>
            <MockedUpdateUserProvider>{children}</MockedUpdateUserProvider>
          </UpdateUserModalProvider>
        </MockedDeleteUserProvider>
      </DeleteUserModalProvider>
    </UserDetailModalProvider>
  );
}
