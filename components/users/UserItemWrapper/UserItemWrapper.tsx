import { UserDetailModal } from "../UserDetailModal";
import { UpdateUserModal } from "../UpdateUserModal";
import { DeleteUserModal } from "../DeleteUserModal";
import { UpdateUserProvider } from "../UpdateUserProvider";
import { DeleteUserProvider } from "../DeleteUserProvider";
import { UserDetailContainer } from "../UserDetailContainer";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { UpdateUserFormContainer } from "../UpdateUserFormContainer";
import { UserDetailHeaderContainer } from "../UserDetailHeaderContainer";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";

interface UserItemWrapperProps {
  userId: string;
  userFullName: string;
  children: React.ReactNode;
}

export function UserItemWrapper({
  userId,
  userFullName,
  children,
}: UserItemWrapperProps) {
  return (
    <ModalManagerProvider>
      <DeleteUserProvider>
        <UpdateUserProvider>
          {children}

          <UserDetailModal
            userDetailContainer={<UserDetailContainer userId={userId} />}
            userDetailHeaderContainer={
              <UserDetailHeaderContainer userId={userId} />
            }
          />

          <UpdateUserModal
            updateUserFormContainer={
              <UpdateUserFormContainer userId={userId} />
            }
          />

          <DeleteUserModal userId={userId} userFullName={userFullName} />
        </UpdateUserProvider>
      </DeleteUserProvider>

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
