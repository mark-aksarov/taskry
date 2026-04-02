"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteUserContext } from "../DeleteUserContext";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteUserProviderProps {
  children: React.ReactNode;
}

export function DeleteUserProvider({ children }: DeleteUserProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useShowToastOnActionError(state);

  return (
    <DeleteUserContext.Provider value={contextValue}>
      {children}
    </DeleteUserContext.Provider>
  );
}
