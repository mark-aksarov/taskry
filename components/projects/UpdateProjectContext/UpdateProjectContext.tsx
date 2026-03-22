"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const UpdateProjectContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface UpdateProjectProviderProps {
  updateProject: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateProjectProvider({
  updateProject,
  children,
}: UpdateProjectProviderProps) {
  const pathname = usePathname();

  const contextValue = useUpdateEntityContextValue(updateProject);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/projects") {
      throw new Error(state.message, { cause: "projectNotFound" });
    }

    notFound();
  }

  // wait for transition to finish
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  return (
    <UpdateProjectContext.Provider value={contextValue}>
      {children}
    </UpdateProjectContext.Provider>
  );
}

export function useUpdateProject() {
  const context = useContext(UpdateProjectContext);
  if (!context) {
    throw new Error(
      "useUpdateProject must be used within a UpdateProjectProvider",
    );
  }
  return context;
}
