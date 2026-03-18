import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/components/common/Toolbar";

import {
  UserManageMenuTriggerLarge,
  UserManageMenuTriggerMobile,
} from "@/components/users/UserManageMenuTrigger";

import {
  UserSortingMenuTriggerLarge,
  UserSortingMenuTriggerMobile,
} from "@/components/users/UserSortingMenuTrigger";

import {
  CreateUserMenuTriggerLarge,
  CreateUserMenuTriggerMobile,
} from "@/components/users/CreateUserMenuTrigger";

import {
  UserFiltersModalTriggerLarge,
  UserFiltersModalTriggerMobile,
} from "@/components/users/UserFiltersModal";

import { useTranslations } from "next-intl";
import { UserSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { NewUserModal } from "@/components/users/NewUserModal";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { UserSearchModal } from "@/components/users/UserSearchModal";
import { UserResultsCount } from "@/components/users/UserResultsCount";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewPositionModal } from "@/components/position/NewPositionModal";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/components/search/SearchModalTrigger";
import { UsersFilteredEmptySection } from "@/components/users/UsersFilteredEmptySection";
import { UserPositionFiltersModalTrigger } from "@/components/users/UserPositionFiltersModal";

interface UsersPageProps {
  totalFilteredUsers: number;
  selectedSortField: UserSortField;
  searchContainer: React.ReactNode;
  usersContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
  positionFiltersFormContainer: React.ReactNode;
}

export function UsersPage({
  totalFilteredUsers,
  selectedSortField,
  searchContainer,
  usersContainer,
  filtersFormContainer,
  positionFiltersFormContainer,
}: UsersPageProps) {
  const t = useTranslations("app.UsersPage");

  const isFilteredEmpty = totalFilteredUsers === 0;

  return (
    <>
      <PageContainer fullscreen={isFilteredEmpty} headerOffset>
        <PageGrid className="relative flex-auto">
          <ViewModeProvider>
            <ToolbarLarge
              firstSlot={
                <>
                  <UserManageMenuTriggerLarge />
                  <UserSortingMenuTriggerLarge
                    selectedSortField={selectedSortField}
                  />
                  <UserFiltersModalTriggerLarge
                    filtersFormContainer={filtersFormContainer}
                  />
                </>
              }
              secondSlot={
                <>
                  <ViewModeToggleButtonGroup />
                  <CreateUserMenuTriggerLarge />
                </>
              }
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
              <UserFiltersModalTriggerMobile
                filtersFormContainer={filtersFormContainer}
              />
              <UserPositionFiltersModalTrigger
                filtersFormContainer={positionFiltersFormContainer}
              />
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
        </PageGrid>
      </PageContainer>

      <UserSearchModal searchContainer={searchContainer} />
      <NewUserModal />
      <NewPositionModal />
    </>
  );
}
