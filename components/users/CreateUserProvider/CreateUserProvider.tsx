"use client";

import { CreateUserContext } from "../CreateUserContext";
import { createUser } from "@/lib/actions/user/createUser";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateUserProviderProps {
  children: React.ReactNode;
}

export function CreateUserProvider({ children }: CreateUserProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(createUser);

  useCloseModalThenShowToastOnActionSuccess(contextValue.state, "createUser");
  useShowToastWhenModalClosedOnActionSuccess(contextValue.state, "createUser");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createUser");

  return (
    <CreateUserContext.Provider value={contextValue}>
      {children}
    </CreateUserContext.Provider>
  );
}
