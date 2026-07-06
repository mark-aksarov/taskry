import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/dashboard/common/Toolbar";

import {
  UserManageMenuTriggerLarge,
  UserManageMenuTriggerMobile,
} from "@/dashboard/users/UserManageMenuTrigger";

import {
  UserSortingMenuTriggerLarge,
  UserSortingMenuTriggerMobile,
} from "@/dashboard/users/UserSortingMenuTrigger";

import {
  CreateUserMenuTriggerLarge,
  CreateUserMenuTriggerMobile,
} from "@/dashboard/users/CreateUserMenuTrigger";

import {
  UserFiltersModalTriggerLarge,
  UserFiltersModalTriggerMobile,
} from "@/dashboard/users/UserFiltersModal";

import { useTranslations } from "next-intl";
import { UserSortField } from "@/lib/types";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { UserResultsCount } from "@/dashboard/users/UserResultsCount";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { UsersFilteredEmptySection } from "@/dashboard/users/UsersFilteredEmptySection";
import { UserPositionFiltersModalTrigger } from "@/dashboard/users/UserPositionFiltersModal";

interface TeamPageProps {
  positionCount: number;
  totalFilteredUsers: number;
  selectedSortField: UserSortField;
  usersContainer: React.ReactNode;
}

export function TeamPage({
  positionCount,
  totalFilteredUsers,
  selectedSortField,
  usersContainer,
}: TeamPageProps) {
  const t = useTranslations("app.TeamPage");

  const isFilteredEmpty = totalFilteredUsers === 0;

  return (
    <DashboardContainer fullscreen={isFilteredEmpty} headerOffset>
      <DashboardGrid className="relative flex-auto">
        <ViewModeProvider>
          <ToolbarLarge
            firstSlot={
              <>
                <UserManageMenuTriggerLarge />
                <UserSortingMenuTriggerLarge
                  selectedSortField={selectedSortField}
                />
                <UserFiltersModalTriggerLarge />
              </>
            }
            secondSlot={
              <>
                <ViewModeToggleButtonGroup />
                <CreateUserMenuTriggerLarge />
              </>
            }
            twoRowsOnLg
          />

          <ToolbarMobile
            firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
            secondSlot={
              <>
                <CreateUserMenuTriggerMobile />
                <UserManageMenuTriggerMobile />
              </>
            }
          />

          <ToolbarSearchMobile>
            <SearchModalTrigger />
          </ToolbarSearchMobile>

          <ToolbarFiltersMobile>
            <UserFiltersModalTriggerMobile />
            {positionCount > 0 && <UserPositionFiltersModalTrigger />}
          </ToolbarFiltersMobile>

          {!isFilteredEmpty && (
            <ToolbarMobile
              firstSlot={<UserResultsCount count={totalFilteredUsers} />}
              secondSlot={
                <UserSortingMenuTriggerMobile
                  selectedSortField={selectedSortField}
                />
              }
            />
          )}

          {isFilteredEmpty ? <UsersFilteredEmptySection /> : usersContainer}
        </ViewModeProvider>
      </DashboardGrid>
    </DashboardContainer>
  );
}
