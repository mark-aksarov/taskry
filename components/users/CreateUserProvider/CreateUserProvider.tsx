"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateUserContext } from "../CreateUserContext";
import { createUser } from "@/lib/actions/user/createUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateUserProviderProps {
  children: React.ReactNode;
}

export function CreateUserProvider({ children }: CreateUserProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createUser, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalThenShowToastOnActionSuccess(contextValue.state, "createUser");
  useShowToastWhenModalClosedOnActionSuccess(contextValue.state, "createUser");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createUser");

  return (
    <CreateUserContext.Provider value={contextValue}>
      {children}
    </CreateUserContext.Provider>
  );
}
