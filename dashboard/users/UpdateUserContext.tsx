"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
const UpdateUserContext = createContext<ActionContextType | null>(null);

interface UpdateUserProviderProps {
  children: React.ReactNode;
}

export function UpdateUserProvider({ children }: UpdateUserProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUser");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUser");

  return (
    <UpdateUserContext.Provider value={contextValue}>
      {children}
    </UpdateUserContext.Provider>
  );
}

export function useUpdateUser() {
  const context = useContext(UpdateUserContext);
  if (!context) {
    throw new Error(
      "useUpdateUser must be used within a UpdateUserContext.Provider",
    );
  }
  return context;
}
