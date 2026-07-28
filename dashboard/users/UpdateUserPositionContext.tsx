"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateUserPositionContext =
  createContext<ActionContextType | null>(null);

interface UpdateUserPositionProviderProps {
  children: React.ReactNode;
}

export function UpdateUserPositionProvider({
  children,
}: UpdateUserPositionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUserPosition");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserPosition");

  return (
    <UpdateUserPositionContext.Provider value={contextValue}>
      {children}
    </UpdateUserPositionContext.Provider>
  );
}

export function useUpdateUserPosition() {
  const context = useContext(UpdateUserPositionContext);
  if (!context) {
    throw new Error(
      "useUpdateUserPosition must be used within a UpdateUserPositionContext.Provider",
    );
  }
  return context;
}
