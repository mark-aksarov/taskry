"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateUserFullNameContext = createContext<ActionContextType | null>(null);

interface UpdateUserFullNameProviderProps {
  children: React.ReactNode;
}

export function UpdateUserFullNameProvider({
  children,
}: UpdateUserFullNameProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUserFullName");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserFullName");

  return (
    <UpdateUserFullNameContext.Provider value={contextValue}>
      {children}
    </UpdateUserFullNameContext.Provider>
  );
}

export function useUpdateUserFullName() {
  const context = useContext(UpdateUserFullNameContext);
  if (!context) {
    throw new Error(
      "useUpdateUserFullName must be used within a UpdateUserFullNameContext.Provider",
    );
  }
  return context;
}
