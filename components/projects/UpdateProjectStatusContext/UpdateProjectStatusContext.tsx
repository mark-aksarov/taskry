"use client";

import {
  ActionFn,
  ActionState,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";

import {
  UpdateEntityStatusContextType,
  useUpdateEntityStatusContextValue,
} from "@/lib/hooks/useUpdateEntityStatusContextValue";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const UpdateProjectStatusContext =
  createContext<UpdateEntityStatusContextType | null>(null);

interface UpdateProjectStatusProviderProps {
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusPayload>;
  children: React.ReactNode;
}

export function UpdateProjectStatusProvider({
  updateProjectStatus,
  children,
}: UpdateProjectStatusProviderProps) {
  const pathname = usePathname();

  const contextValue = useUpdateEntityStatusContextValue(updateProjectStatus);

  const { state } = contextValue;

  // wait for transition to finish
  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/projects") {
      throw new Error(state.message, { cause: state.errorCode });
    }

    notFound();
  }
  useShowToastOnActionError(state);

  return (
    <UpdateProjectStatusContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusContext.Provider>
  );
}

export function useUpdateProjectStatus() {
  const context = useContext(UpdateProjectStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatus must be used within a UpdateProjectStatusProvider",
    );
  }
  return context;
}
