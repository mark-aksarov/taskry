"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateUserContext } from "../CreateUserContext";
import { createUser } from "@/lib/actions/user/createUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface CreateUserProviderProps {
  children: React.ReactNode;
}

export function CreateUserProvider({ children }: CreateUserProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createUser, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createUser");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createUser");

  return (
    <CreateUserContext.Provider value={contextValue}>
      {children}
    </CreateUserContext.Provider>
  );
}
