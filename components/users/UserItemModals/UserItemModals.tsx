import { UserDetailModal } from "../UserDetailModal";
import { UpdateUserModal } from "../UpdateUserModal";
import { DeleteUserModal } from "../DeleteUserModal";
import { UserDetailContainer } from "../UserDetailContainer";
import { UpdateUserFormContainer } from "../UpdateUserFormContainer";
import { UserDetailHeaderContainer } from "../UserDetailHeaderContainer";

interface UserItemModalsProps {
  user: {
    id: string;
    fullName: string;
  };
}

export function UserItemModals({ user }: UserItemModalsProps) {
  return (
    <>
      <UserDetailModal
        userId={user.id}
        userDetailContainer={<UserDetailContainer userId={user.id} />}
        userDetailHeaderContainer={
          <UserDetailHeaderContainer userId={user.id} />
        }
      />
      <UpdateUserModal
        updateUserFormContainer={<UpdateUserFormContainer userId={user.id} />}
      />
      <DeleteUserModal userId={user.id} userFullName={user.fullName} />
    </>
  );
}
