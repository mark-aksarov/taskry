import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { UserToolbarSortingMenuTrigger } from "@/components/users/UserToolbarSortingMenuTrigger";

interface UsersPageProps {
  userToolbarFiltersModalTrigger: React.ReactNode;
  userToolbarCreateNewMenuTrigger: React.ReactNode;
  usersContainer: React.ReactNode;
}

export function UsersPage({
  userToolbarFiltersModalTrigger,
  userToolbarCreateNewMenuTrigger,
  usersContainer,
}: UsersPageProps) {
  const t = useTranslations("app.UsersPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <UserToolbarSortingMenuTrigger />
            {userToolbarFiltersModalTrigger}
            <ViewModeToggleButtonGroup className="ml-auto" />
            {userToolbarCreateNewMenuTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <UserToolbarSortingMenuTrigger />
            {userToolbarFiltersModalTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            {userToolbarCreateNewMenuTrigger}
          </ToolbarMobileBottom>
          {usersContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
