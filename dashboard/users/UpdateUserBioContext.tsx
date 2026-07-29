"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateUserBioContext = createContext<ActionContextType | null>(null);

interface UpdateUserBioProviderProps {
  children: React.ReactNode;
}

export function UpdateUserBioProvider({
  children,
}: UpdateUserBioProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUserBio");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserBio");

  return (
    <UpdateUserBioContext.Provider value={contextValue}>
      {children}
    </UpdateUserBioContext.Provider>
  );
}

export function useUpdateUserBio() {
  const context = useContext(UpdateUserBioContext);
  if (!context) {
    throw new Error(
      "useUpdateUserBio must be used within a UpdateUserBioContext.Provider",
    );
  }
  return context;
}
