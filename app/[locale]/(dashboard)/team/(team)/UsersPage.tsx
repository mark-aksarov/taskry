import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewPositionForm } from "@/components/users/NewPositionForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { UserFiltersFormSkeleton } from "@/components/users/UserFiltersForm";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";
import { UserToolbarActionsMenuTrigger } from "@/components/users/UserToolbarActionsMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";
import { UserToolbarSortingMenuTrigger } from "@/components/users/UserToolbarSortingMenuTrigger";

interface UsersPageProps {
  page: number;
  pageSize: number;
  sort: string;
  createPositionAction: ActionFn<ActionState, FormData>;
  deleteUsersAction: ActionFn<ActionState, DeleteUsersPayload>;
  UserFiltersFormContainer: React.ComponentType;
  UsersServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    sort: string;
  }>;
}

export function UsersPage({
  page,
  pageSize,
  sort,
  createPositionAction,
  deleteUsersAction,
  UserFiltersFormContainer,
  UsersServerContainer,
}: UsersPageProps) {
  const t = useTranslations("app.UsersPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <UserToolbarSortingMenuTrigger />
              <UserToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<UserFiltersFormSkeleton />}>
                    <UserFiltersFormContainer />
                  </Suspense>
                }
              />
              <UserToolbarActionsMenuTrigger deleteAction={deleteUsersAction} />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <UserToolbarCreateNewMenuTrigger
                newUserForm={<></>}
                newPositionForm={
                  <NewPositionForm formAction={createPositionAction} />
                }
              />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <UserToolbarSortingMenuTrigger />
              <UserToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<UserFiltersFormSkeleton />}>
                    <UserFiltersFormContainer />
                  </Suspense>
                }
              />
              <UserToolbarActionsMenuTrigger deleteAction={deleteUsersAction} />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <UserToolbarCreateNewMenuTrigger
                newUserForm={<></>}
                newPositionForm={
                  <NewPositionForm formAction={createPositionAction} />
                }
              />
            </ToolbarMobileBottom>
            <UsersServerContainer page={page} pageSize={pageSize} sort={sort} />
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
