import {
  EntityContainerPagination,
  EntityPaginationProvider,
} from "@/components/common/EntityContainerPagination";

import { Suspense } from "react";
import { UserList } from "../UserList";
import { UserGrid } from "../UserGrid";
import { UserFilters } from "@/lib/types";
import { UserListItem } from "../UserListItem";
import { UserGridItem } from "../UserGridItem";
import { UserDetailSkeleton } from "../UserDetail";
import { UserDetailModal } from "../UserDetailModal";
import { getUserList } from "@/lib/data/user/user.service";
import { UserListItemDTO } from "@/lib/data/user/user.dto";
import { deleteUsers } from "@/lib/actions/user/deleteUsers";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { UserDetailContainer } from "../UserDetailContainer";
import { UserDetailBottomSheet } from "../UserDetailBottomSheet";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

interface UserItemActionMenuTriggerSlotProps {
  userId: string;
  userFullName: string;
  className?: string;
}

function UserItemActionMenuTriggerSlot({
  userId,
  userFullName,
  className,
}: UserItemActionMenuTriggerSlotProps) {
  return (
    <UserItemActionMenuTrigger
      userId={userId}
      userFullName={userFullName}
      deleteAction={deleteUsers}
      className={className}
    />
  );
}

function UserDetailSlotContent({ userId }: { userId: string }) {
  return (
    <Suspense
      fallback={
        <PersonDetailPresentation
          personHeader={<PersonHeaderSkeleton />}
          userDetail={<UserDetailSkeleton />}
        />
      }
    >
      <UserDetailContainer userId={userId} />
    </Suspense>
  );
}

function UserDetailModalSlot({ userId }: { userId: string }) {
  return (
    <UserDetailModal
      userId={userId}
      userDetailContainer={<UserDetailSlotContent userId={userId} />}
    />
  );
}

function UserDetailBottomSheetSlot({ userId }: { userId: string }) {
  return (
    <UserDetailBottomSheet
      userId={userId}
      userDetailContainer={<UserDetailSlotContent userId={userId} />}
    />
  );
}

interface UsersContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  filters?: UserFilters;
}

export async function UsersContainer({
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

  return (
    <EntityPaginationProvider>
      <ViewModeLayout
        list={
          <UserList>
            {users.map((user) => (
              <UserListItem
                key={user.id}
                menuTrigger={
                  <UserItemActionMenuTriggerSlot
                    userId={user.id}
                    userFullName={user.fullName}
                  />
                }
                userDetailModal={<UserDetailModalSlot userId={user.id} />}
                userDetailBottomSheet={
                  <UserDetailBottomSheetSlot userId={user.id} />
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
                  <UserItemActionMenuTriggerSlot
                    userId={user.id}
                    userFullName={user.fullName}
                    className="-mr-2"
                  />
                }
                userDetailModal={<UserDetailModalSlot userId={user.id} />}
                userDetailBottomSheet={
                  <UserDetailBottomSheetSlot userId={user.id} />
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
  );
}
