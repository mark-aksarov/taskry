import { UserDetail } from "../../UserDetail";
import { mockedUserDetail } from "@/mocks/users";
import { UpdateUserForm } from "../../UpdateUserForm";
import { DeleteUserModal } from "../../DeleteUserModal";
import { UpdateUserModal } from "../../UpdateUserModal";
import { UserDetailModal } from "../../UserDetailModal";
import { UserDetailHeader } from "../../UserDetailHeader";
import { mockedPositionSummaries } from "@/mocks/positions";

export function MockedUserItemModals() {
  return (
    <>
      <UserDetailModal
        userId={mockedUserDetail.id}
        userDetailContainer={<UserDetail {...mockedUserDetail} />}
        userDetailHeaderContainer={
          <UserDetailHeader
            fullName={mockedUserDetail.fullName}
            positionName={mockedUserDetail.position.name}
            imageUrl={mockedUserDetail.imageUrl}
          />
        }
      />
      <UpdateUserModal
        updateUserFormContainer={
          <UpdateUserForm
            {...mockedUserDetail}
            userId={mockedUserDetail.id}
            positionSelectItems={mockedPositionSummaries}
          />
        }
      />
      <DeleteUserModal
        userId={mockedUserDetail.id}
        userFullName={mockedUserDetail.fullName}
      />
    </>
  );
}
