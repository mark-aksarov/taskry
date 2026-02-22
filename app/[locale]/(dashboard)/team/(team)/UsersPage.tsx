import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { UserSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { UsersFilteredEmptySection } from "@/components/users/UsersFilteredEmptySection";
import { UserToolbarManageMenuTrigger } from "@/components/users/UserToolbarManageMenuTrigger";
import { UserToolbarSortingMenuTrigger } from "@/components/users/UserToolbarSortingMenuTrigger";

interface UsersPageProps {
  totalFilteredUsers: number;
  userToolbarFiltersModalTrigger: React.ReactNode;
  userToolbarCreateNewMenuTrigger: React.ReactNode;
  usersContainer: React.ReactNode;
  selectedSortField: UserSortField;
}

export function UsersPage({
  totalFilteredUsers,
  userToolbarFiltersModalTrigger,
  userToolbarCreateNewMenuTrigger,
  usersContainer,
  selectedSortField,
}: UsersPageProps) {
  const t = useTranslations("app.UsersPage");

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
