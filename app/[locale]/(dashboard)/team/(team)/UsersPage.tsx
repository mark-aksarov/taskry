import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { UserSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { UsersFilteredEmptySection } from "@/components/users/UsersFilteredEmptySection";
import { UserToolbarManageMenuTrigger } from "@/components/users/UserToolbarManageMenuTrigger";
import { UserToolbarSortingMenuTrigger } from "@/components/users/UserToolbarSortingMenuTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";

interface UsersPageProps {
  totalFilteredUsers: number;
  selectedSortField: UserSortField;
  usersContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
  createUser: ActionFn<ActionState, FormData>;
  createPosition: ActionFn<ActionState, FormData>;
}

export function UsersPage({
  totalFilteredUsers,
  selectedSortField,
  usersContainer,
  filtersFormContainer,
  createUser,
  createPosition,
}: UsersPageProps) {
  const t = useTranslations("app.UsersPage");

  const userToolbarCreateNewMenuTrigger = (
    <UserToolbarCreateNewMenuTrigger
      createUser={createUser}
      createPosition={createPosition}
    />
  );

  const userToolbarFiltersModalTrigger = (
    <UserToolbarFiltersModalTrigger
      filtersFormContainer={filtersFormContainer}
    />
  );

  return (
    <PageContainer fullscreen={totalFilteredUsers === 0} className="relative">
      <PageGrid className="flex-auto">
        <ViewModeProvider>
          <ToolbarDesktop>
            <UserToolbarManageMenuTrigger />
            <UserToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {userToolbarFiltersModalTrigger}
            <ViewModeToggleButtonGroup className="ml-auto" />
            {userToolbarCreateNewMenuTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <UserToolbarManageMenuTrigger />
            <UserToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {userToolbarFiltersModalTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            {userToolbarCreateNewMenuTrigger}
          </ToolbarMobileBottom>

          {totalFilteredUsers === 0 ? (
            <UsersFilteredEmptySection />
          ) : (
            usersContainer
          )}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
