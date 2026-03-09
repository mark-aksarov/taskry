"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { usePathname } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { notFound, useParams } from "next/navigation";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

const UpdateUserContext = createContext<UpdateEntityContextType | null>(null);

interface UpdateUserProviderProps {
  updateUser: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateUserProvider({
  updateUser,
  children,
}: UpdateUserProviderProps) {
  const pathname = usePathname();
  const params = useParams();
  const contextValue = useUpdateEntityContextValue(updateUser);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    if (
      (pathname.startsWith("/team") && params.id) ||
      pathname.startsWith("/profile")
    ) {
      notFound();
    }
    throw new Error(state.message, { cause: "userNotFound" });
  }

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

  return (
    <UpdateUserContext.Provider value={contextValue}>
      {children}
    </UpdateUserContext.Provider>
  );
}

export function useUpdateUser() {
  const context = useContext(UpdateUserContext);
  if (!context) {
    throw new Error("useUpdateUser must be used within a UpdateUserProvider");
  }
  return context;
}
