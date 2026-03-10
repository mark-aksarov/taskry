import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { UserSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { NewUserModal } from "@/components/users/NewUserModal";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
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
  usersContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
}

export function UsersPage({
  totalFilteredUsers,
  selectedSortField,
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
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
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

      <NewUserModal />
      <NewPositionModal />
    </>
  );
}
