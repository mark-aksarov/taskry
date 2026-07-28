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
  UserFiltersModal,
  UserFiltersModalTriggerLarge,
  UserFiltersModalTriggerMobile,
} from "@/dashboard/users/UserFiltersModal";

import {
  UserPositionFiltersModal,
  UserPositionFiltersModalTrigger,
} from "@/dashboard/users/UserPositionFiltersModal";

import { useTranslations } from "next-intl";
import { UserFilters, UserSortField } from "@/lib/types";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { UserSearchModal } from "@/dashboard/users/UserSearchModal";
import { CreateUserModal } from "@/dashboard/users/CreateUserModal";
import { UserResultsCount } from "@/dashboard/users/UserResultsCount";
import { EntityPagination } from "@/dashboard/common/EntityPagination";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { CreateUserProvider } from "@/dashboard/users/CreateUserContext";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { UserFiltersProvider } from "@/dashboard/users/UserFiltersContext";
import { CreatePositionModal } from "@/dashboard/position/CreatePositionModal";
import { CreatePositionProvider } from "@/dashboard/position/CreatePositionContext";
import { UsersFilteredEmptySection } from "@/dashboard/users/UsersFilteredEmptySection";

interface TeamPageProps {
  page: number;
  pageSize: number;
  positionCount: number;
  totalFilteredUsers: number;
  filters: UserFilters;
  selectedSortField: UserSortField;
  userGrid: React.ReactNode;
  searchContainer: React.ReactNode;
  userFiltersFormContainer: React.ReactNode;
  userPositionFiltersFormContainer: React.ReactNode;
}

export function TeamPage({
  page,
  pageSize,
  positionCount,
  totalFilteredUsers,
  filters,
  selectedSortField,
  userGrid,
  searchContainer,
  userFiltersFormContainer,
  userPositionFiltersFormContainer,
}: TeamPageProps) {
  const t = useTranslations("app.TeamPage");

  const isFilteredEmpty = totalFilteredUsers === 0;

  return (
    <CreateUserProvider>
      <CreatePositionProvider>
        <UserFiltersProvider filters={filters}>
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
                  firstSlot={
                    <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                  }
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

                {isFilteredEmpty ? (
                  <UsersFilteredEmptySection />
                ) : (
                  <>
                    <>{userGrid}</>
                    <EntityPagination
                      page={page}
                      pageSize={pageSize}
                      totalPages={Math.ceil(totalFilteredUsers / pageSize)}
                    />
                  </>
                )}
              </ViewModeProvider>
            </DashboardGrid>
          </DashboardContainer>

          <UserSearchModal searchContainer={searchContainer} />
          <CreateUserModal />
          <CreatePositionModal />
          <UserFiltersModal filtersFormContainer={userFiltersFormContainer} />
          <UserPositionFiltersModal
            filtersFormContainer={userPositionFiltersFormContainer}
          />
        </UserFiltersProvider>
      </CreatePositionProvider>
    </CreateUserProvider>
  );
}
