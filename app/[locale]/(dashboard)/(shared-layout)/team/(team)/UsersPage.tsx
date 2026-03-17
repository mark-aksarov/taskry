import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  PageHeadingMobile,
} from "@/components/common/ToolbarOld";

import { useTranslations } from "next-intl";
import { UserSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { NewUserModal } from "@/components/users/NewUserModal";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { UserSearchModal } from "@/components/users/UserSearchModal";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewPositionModal } from "@/components/position/NewPositionModal";
import { UsersFilteredEmptySection } from "@/components/users/UsersFilteredEmptySection";
import { UserToolbarManageMenuTrigger } from "@/components/users/UserToolbarManageMenuTrigger";
import { UserToolbarSortingMenuTrigger } from "@/components/users/UserToolbarSortingMenuTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";

interface UsersPageProps {
  totalFilteredUsers: number;
  selectedSortField: UserSortField;
  searchContainer: React.ReactNode;
  usersContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
}

export function UsersPage({
  totalFilteredUsers,
  selectedSortField,
  searchContainer,
  usersContainer,
  filtersFormContainer,
}: UsersPageProps) {
  const t = useTranslations("app.UsersPage");

  const isFilteredEmpty = totalFilteredUsers === 0;

  return (
    <>
      <PageContainer fullscreen={isFilteredEmpty} headerOffset>
        <PageGrid className="relative flex-auto">
          <ViewModeProvider>
            <ToolbarDesktop>
              <UserToolbarManageMenuTrigger />
              <UserToolbarSortingMenuTrigger
                selectedSortField={selectedSortField}
              />
              <UserToolbarFiltersModalTrigger
                filtersFormContainer={filtersFormContainer}
              />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <UserToolbarCreateNewMenuTrigger />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              <UserToolbarManageMenuTrigger />
              <UserToolbarSortingMenuTrigger
                selectedSortField={selectedSortField}
              />
              <UserToolbarFiltersModalTrigger
                filtersFormContainer={filtersFormContainer}
              />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <UserToolbarCreateNewMenuTrigger />
            </ToolbarMobileBottom>

            {totalFilteredUsers === 0 ? (
              <UsersFilteredEmptySection />
            ) : (
              usersContainer
            )}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <UserSearchModal searchContainer={searchContainer} />
      <NewUserModal />
      <NewPositionModal />
    </>
  );
}
