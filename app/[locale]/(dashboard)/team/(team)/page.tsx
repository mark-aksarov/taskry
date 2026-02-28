import {
  pageSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
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
import { UsersContainer } from "@/components/users/UsersContainer";
import { createPosition } from "@/lib/actions/position/createPosition";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";

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
  const session = await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort, ...filters } =
    searchParamsSchema.parse(rawParams);

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  // Render the empty page if there are no users
  const totalCount = await getUserCount();

  if (!totalCount) {
    return (
      <CurrentUserProvider value={currentUserContextValue}>
        <UsersPageEmpty
          createUser={createUser}
          createPosition={createPosition}
        />
      </CurrentUserProvider>
    );
  }

  // Get total count of users based on filters and sorting
  const totalFilteredUsers = await getUserCount(filters);

  return (
    <PageTransitionProvider>
      <CurrentUserProvider value={currentUserContextValue}>
        <UsersPage
          totalFilteredUsers={totalFilteredUsers}
          selectedSortField={sort}
          filtersFormContainer={<UserFiltersFormContainer filters={filters} />}
          usersContainer={
            <UsersContainer
              page={page}
              pageSize={pageSize}
              sort={sort}
              filters={filters}
            />
          }
          createUser={createUser}
          createPosition={createPosition}
        />
      </CurrentUserProvider>
    </PageTransitionProvider>
  );
}
