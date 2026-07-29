"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateUserBirthdateContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateUserBirthdateProviderProps {
  children: React.ReactNode;
}

export function UpdateUserBirthdateProvider({
  children,
}: UpdateUserBirthdateProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUserBirthdate");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserBirthdate");

  return (
    <UpdateUserBirthdateContext.Provider value={contextValue}>
      {children}
    </UpdateUserBirthdateContext.Provider>
  );
}

export function useUpdateUserBirthdate() {
  const context = useContext(UpdateUserBirthdateContext);
  if (!context) {
    throw new Error(
      "useUpdateUserBirthdate must be used within a UpdateUserBirthdateContext.Provider",
    );
  }
  return context;
}
