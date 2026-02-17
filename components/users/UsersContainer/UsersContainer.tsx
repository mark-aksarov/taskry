import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { UserFilters } from "@/lib/types";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";
import { UserDetailModal } from "../UserDetailModal";
import { getUserList } from "@/lib/data/user/user.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { DeleteUserModalProvider } from "../DeleteUserModal";
import { UserDetailContainer } from "../UserDetailContainer";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { EditUserFormContainer } from "../EditUserFormContainer";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";

interface UsersContainerProps {
  showUserActionMenuTrigger: boolean;
  page: number;
  pageSize: number;
  sort: string;
  filters?: UserFilters;
}

export async function UsersContainer({
  showUserActionMenuTrigger,
  page,
  pageSize,
  sort,
  filters,
}: UsersContainerProps) {
  const { items: users, totalCount } = await getUserList({
    page,
    pageSize,
    sort,
    filters,
  });

  const getUserCommonProps = (user: UserListItemDTO) => ({
    id: user.id,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
    email: user.email,
    phoneNumber: user.phoneNumber,
    publicLink: user.publicLink,
    position: user.position,
  });

  const guestMode = await hasGuestRole();

  // The user can't delete themselves, so we need to make sure the user sees the "Delete" menu item.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const authUser = session!.user;

  return (
    <DeleteUserModalProvider deleteEntity={deleteUser}>
      <EntityPaginationProvider>
        <ViewModeLayout
          list={
            <UserList>
              {users.map((user) => (
                <UserListItem
                  key={user.id}
                  menuTrigger={
                    showUserActionMenuTrigger && (
                      <UserItemActionMenuTrigger
                        showDeleteMenuItem={user.id !== authUser.id}
                        guestMode={guestMode}
                        editUserFormContainer={
                          <EditUserFormContainer userId={user.id} />
                        }
                        userId={user.id}
                        userFullName={user.fullName}
                      />
                    )
                  }
                  userDetailModal={
                    <UserDetailModal
                      userId={user.id}
                      userDetailContainer={
                        <UserDetailContainer userId={user.id} />
                      }
                    />
                  }
                  {...getUserCommonProps(user)}
                />
              ))}
            </UserList>
          }
          grid={
            <UserGrid>
              {users.map((user) => (
                <UserGridItem
                  key={user.id}
                  menuTrigger={
                    showUserActionMenuTrigger && (
                      <UserItemActionMenuTrigger
                        showDeleteMenuItem={user.id !== authUser.id}
                        guestMode={guestMode}
                        editUserFormContainer={
                          <EditUserFormContainer userId={user.id} />
                        }
                        userId={user.id}
                        userFullName={user.fullName}
                        className="-mr-2"
                      />
                    )
                  }
                  userDetailModal={
                    <UserDetailModal
                      userId={user.id}
                      userDetailContainer={
                        <UserDetailContainer userId={user.id} />
                      }
                    />
                  }
                  {...getUserCommonProps(user)}
                />
              ))}
            </UserGrid>
          }
        />

        <EntityContainerPagination
          page={page}
          totalPages={Math.ceil(totalCount / pageSize)}
          pageSize={pageSize}
        />
      </EntityPaginationProvider>
    </DeleteUserModalProvider>
  );
}
