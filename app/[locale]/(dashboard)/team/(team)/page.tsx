import {
  booleanSearchParam,
  pageSearchParam,
  pageSizeSearchParam,
  searchParamToArray,
} from "@/lib/schemas/base";

import { z } from "zod";
import { UsersPage } from "./UsersPage";
import { userSortFields } from "@/lib/types";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { positionId } from "@/lib/schemas/position";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { getUserCount } from "@/lib/data/user/user.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { createUser } from "@/lib/actions/user/createUser";
import { NewUserForm } from "@/components/users/NewUserForm";
import { UsersContainer } from "@/components/users/UsersContainer";
import { createPosition } from "@/lib/actions/position/createPosition";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { NewPositionForm } from "@/components/position/NewPositionForm";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  hasNoActiveTasks: booleanSearchParam,
  hasActiveTasks: booleanSearchParam,
  hasOverdueTasks: booleanSearchParam,
  sort: z.enum(userSortFields).catch("fullName"),
  position: z.preprocess(
    searchParamToArray,
    z.array(positionId).optional().catch(undefined),
  ),
});

export default async function AppUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort, ...filters } =
    searchParamsSchema.parse(rawParams);

  // Get total count of users in the current workspace
  const totalCount = await getUserCount();
  const guestMode = await hasGuestRole();

  // Only the owner and guests can see the user menu item
  const isOwner = await hasOwnerRole();
  const showCreateNewUserMenuItem = isOwner || guestMode;

  const userToolbarCreateNewMenuTrigger = (
    <UserToolbarCreateNewMenuTrigger
      showCreateNewUserMenuItem={showCreateNewUserMenuItem}
      guestMode={guestMode}
      newUserForm={<NewUserForm createUser={createUser} />}
      newPositionForm={<NewPositionForm createPosition={createPosition} />}
    />
  );

  if (!totalCount)
    return (
      <UsersPageEmpty
        userToolbarCreateNewMenuTrigger={userToolbarCreateNewMenuTrigger}
      />
    );

  // Only the owner and guests can see the user action menu trigger
  const showUserActionMenuTrigger = isOwner || guestMode;

  // Get total count of users based on filters and sorting
  const totalFilteredUsers = await getUserCount(filters);

  return (
    <PageTransitionProvider>
      <UsersPage
        totalFilteredUsers={totalFilteredUsers}
        selectedSortField={sort}
        userToolbarFiltersModalTrigger={
          <UserToolbarFiltersModalTrigger
            filtersFormContainer={
              <UserFiltersFormContainer filters={filters} />
            }
          />
        }
        userToolbarCreateNewMenuTrigger={userToolbarCreateNewMenuTrigger}
        usersContainer={
          <UsersContainer
            showUserActionMenuTrigger={showUserActionMenuTrigger}
            page={page}
            pageSize={pageSize}
            sort={sort}
            filters={filters}
          />
        }
      />
    </PageTransitionProvider>
  );
}
