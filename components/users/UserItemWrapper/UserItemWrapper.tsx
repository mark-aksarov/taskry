import { UserDetailModal } from "../UserDetailModal";
import { UpdateUserModal } from "../UpdateUserModal";
import { DeleteUserModal } from "../DeleteUserModal";
import { UpdateUserProvider } from "../UpdateUserProvider";
import { DeleteUserProvider } from "../DeleteUserProvider";
import { UserDetailContainer } from "../UserDetailContainer";
import { UpdateUserImageModal } from "../UpdateUserImageModal";
import { DeleteUserImageModal } from "../DeleteUserImageModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { UpdateUserFormContainer } from "../UpdateUserFormContainer";
import { UpdateUserImageProvider } from "../UpdateUserImageProvider";
import { ClearUserImageUrlProvider } from "../ClearUserImageUrlProvider";
import { UserDetailHeaderContainer } from "../UserDetailHeaderContainer";
import { UpdateUserImageFileProvider } from "../UpdateUserImageFileContext";
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
          <UpdateUserImageFileProvider>
            <UpdateUserImageProvider>
              <ClearUserImageUrlProvider userId={userId}>
                {children}

                <UserDetailModal
                  userDetailContainer={<UserDetailContainer userId={userId} />}
                  userDetailHeaderContainer={
                    <UserDetailHeaderContainer userId={userId} />
                  }
                />

                <UpdateUserImageModal userId={userId} />

                <DeleteUserImageModal
                  userId={userId}
                  userFullName={userFullName}
                />

                <UpdateUserModal
                  updateUserFormContainer={
                    <UpdateUserFormContainer userId={userId} />
                  }
                />

                <DeleteUserModal userId={userId} userFullName={userFullName} />
              </ClearUserImageUrlProvider>
            </UpdateUserImageProvider>
          </UpdateUserImageFileProvider>
        </UpdateUserProvider>
      </DeleteUserProvider>

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
