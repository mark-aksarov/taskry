import { z } from "zod";
import { Suspense } from "react";
import { UsersPage } from "./UsersPage";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { arrayParam } from "@/lib/utils/arrayParam";
import { getUserCount } from "@/lib/data/user/user.dal";
import { deleteUsers } from "@/lib/actions/user/deleteUsers";
import { UsersContainer } from "@/components/users/UsersContainer";
import { createPosition } from "@/lib/actions/position/createPosition";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserFiltersFormSkeleton } from "@/components/users/UserFiltersForm";
import { NewPositionForm } from "@/components/users/NewPositionForm/NewPositionForm";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";
import { UserToolbarActionsMenuTrigger } from "@/components/users/UserToolbarActionsMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["fullName", "position"]).catch("fullName"),
  hasNoActiveTasks: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  hasActiveTasks: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  hasOverdueTasks: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  position: arrayParam(z.coerce.number()).catch([]),
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

  if (!count) return <UsersPageEmpty />;

  return (
    <UsersPage
      userToolbarFiltersModalTrigger={
        <UserToolbarFiltersModalTrigger
          filtersFormContainer={
            <Suspense fallback={<UserFiltersFormSkeleton />}>
              <UserFiltersFormContainer filters={filters} />
            </Suspense>
          }
        />
      }
      userToolbarActionsMenuTrigger={
        <UserToolbarActionsMenuTrigger deleteAction={deleteUsers} />
      }
      userToolbarCreateNewMenuTrigger={
        <UserToolbarCreateNewMenuTrigger
          newUserForm={<></>}
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
