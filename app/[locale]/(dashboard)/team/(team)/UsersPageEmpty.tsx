import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";

interface UsersPageEmptyProps {
  guestMode: boolean;
  showCreateNewUserMenuItem: boolean;
  createUser: ActionFn<ActionState, FormData>;
  createPosition: ActionFn<ActionState, FormData>;
}

export function UsersPageEmpty({
  guestMode,
  createUser,
  createPosition,
  showCreateNewUserMenuItem,
}: UsersPageEmptyProps) {
  const t = useTranslations("app.UsersPageEmpty");

  const userToolbarCreateNewMenuTrigger = (
    <UserToolbarCreateNewMenuTrigger
      showCreateNewUserMenuItem={showCreateNewUserMenuItem}
      guestMode={guestMode}
      createUser={createUser}
      createPosition={createPosition}
    />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={userToolbarCreateNewMenuTrigger}
    />
  );
}
