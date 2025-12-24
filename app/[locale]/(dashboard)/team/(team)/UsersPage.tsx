import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewPositionForm } from "@/components/users/NewPositionForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { UserFiltersFormSkeleton } from "@/components/users/UserFiltersForm";
import { UserToolbarActionsMenuTrigger } from "@/components/users/UserToolbarActionsMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";

interface UsersPageProps {
  page: number;
  pageSize: number;
  createPositionAction: ActionFn<ActionState, FormData>;
  UserFiltersFormContainer: React.ComponentType;
  UsersServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
  }>;
}

export function UsersPage({
  page,
  pageSize,
  createPositionAction,
  UserFiltersFormContainer,
  UsersServerContainer,
}: UsersPageProps) {
  const t = useTranslations("app.UsersPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <UserToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<UserFiltersFormSkeleton />}>
                  <UserFiltersFormContainer />
                </Suspense>
              }
            />
            <UserToolbarActionsMenuTrigger />
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
            <UserToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<UserFiltersFormSkeleton />}>
                  <UserFiltersFormContainer />
                </Suspense>
              }
            />
            <UserToolbarActionsMenuTrigger />
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
          <UsersServerContainer page={page} pageSize={pageSize} />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
