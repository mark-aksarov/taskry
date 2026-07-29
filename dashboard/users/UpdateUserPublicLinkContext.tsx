"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateUserPublicLinkContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateUserPublicLinkProviderProps {
  children: React.ReactNode;
}

export function UpdateUserPublicLinkProvider({
  children,
}: UpdateUserPublicLinkProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUserPublicLink");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserPublicLink");

  return (
    <UpdateUserPublicLinkContext.Provider value={contextValue}>
      {children}
    </UpdateUserPublicLinkContext.Provider>
  );
}

export function useUpdateUserPublicLink() {
  const context = useContext(UpdateUserPublicLinkContext);
  if (!context) {
    throw new Error(
      "useUpdateUserPublicLink must be used within a UpdateUserPublicLinkContext.Provider",
    );
  }
  return context;
}
