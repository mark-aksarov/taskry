import { UserSearchModal } from "@/components/users/UserSearchModal";
import { CreateUserModal } from "@/components/users/CreateUserModal";
import { UserFiltersModal } from "@/components/users/UserFiltersModal";
import { CreatePositionModal } from "@/components/position/CreatePositionModal";
import { RouterSearchContainer } from "@/components/common/RouterSearchContainer";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";
import { UserPositionFiltersModal } from "@/components/users/UserPositionFiltersModal";
import { UserPositionFiltersFormContainer } from "@/components/users/UserPositionFiltersFormContainer";

export function UsersPageModals() {
  return (
    <>
      <UserSearchModal searchContainer={<RouterSearchContainer />} />
      <CreateUserModal />
      <CreatePositionModal />
      <UserFiltersModal filtersFormContainer={<UserFiltersFormContainer />} />
      <UserPositionFiltersModal
        filtersFormContainer={<UserPositionFiltersFormContainer />}
      />
    </>
  );
}
