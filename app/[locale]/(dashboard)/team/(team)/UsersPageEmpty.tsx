import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";

interface UsersPageEmptyProps {
  createUser: ActionFn<ActionState, FormData>;
  createPosition: ActionFn<ActionState, FormData>;
}

export function UsersPageEmpty({
  createUser,
  createPosition,
}: UsersPageEmptyProps) {
  const t = useTranslations("app.UsersPageEmpty");

  const userToolbarCreateNewMenuTrigger = (
    <UserToolbarCreateNewMenuTrigger
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
