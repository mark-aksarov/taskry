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
import { NewPositionForm } from "@/components/users/NewPositionForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";
import { UserToolbarActionsMenuTrigger } from "@/components/users/UserToolbarActionsMenuTrigger";
import { UserToolbarSortingMenuTrigger } from "@/components/users/UserToolbarSortingMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";

interface UsersPageProps {
  createPositionAction: ActionFn<ActionState, FormData>;
  deleteUsersAction: ActionFn<ActionState, DeleteUsersPayload>;
  userFiltersFormContainer: React.ReactNode;
  usersContainer: React.ReactNode;
}

export function UsersPage({
  createPositionAction,
  deleteUsersAction,
  userFiltersFormContainer,
  usersContainer,
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
                filtersForm={userFiltersFormContainer}
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
                filtersForm={userFiltersFormContainer}
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
            {usersContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
