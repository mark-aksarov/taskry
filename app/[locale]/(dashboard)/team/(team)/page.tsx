import {
  arraySearchParam,
  booleanSearchParam,
  pageSearchParam,
  pageSizeSearchParam,
} from "@/lib/schemas/base";

import { z } from "zod";
import { UsersPage } from "./UsersPage";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { getUserCount } from "@/lib/data/user/user.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { createUser } from "@/lib/actions/user/createUser";
import { NewUserForm } from "@/components/users/NewUserForm";
import { UsersContainer } from "@/components/users/UsersContainer";
import { createPosition } from "@/lib/actions/position/createPosition";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { NewPositionForm } from "@/components/users/NewPositionForm/NewPositionForm";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  hasNoActiveTasks: booleanSearchParam,
  hasActiveTasks: booleanSearchParam,
  hasOverdueTasks: booleanSearchParam,
  sort: z.enum(["fullName", "position"]).catch("fullName"),
  position: arraySearchParam(z.coerce.number()),
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

  // Get count
  const count = await getUserCount();

  const isOwner = await hasOwnerRole();
  const guestMode = await hasGuestRole();

  if (!count) return <UsersPageEmpty />;

  return (
    <UsersPage
      userToolbarFiltersModalTrigger={
        <UserToolbarFiltersModalTrigger
          filtersFormContainer={<UserFiltersFormContainer filters={filters} />}
        />
      }
      userToolbarCreateNewMenuTrigger={
        <UserToolbarCreateNewMenuTrigger
          showUserMenuItem={isOwner || guestMode}
          guestMode={guestMode}
          newUserForm={<NewUserForm formAction={createUser} />}
          newPositionForm={<NewPositionForm formAction={createPosition} />}
        />
      }
      usersContainer={
        <UsersContainer
          page={page}
          pageSize={pageSize}
          sort={sort}
          filters={filters}
        />
      }
    />
  );
}
