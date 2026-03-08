"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";

const UpdateCompanyContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface UpdateCompanyProviderProps {
  updateCompany: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateCompanyProvider({
  updateCompany,
  children,
}: UpdateCompanyProviderProps) {
  const contextValue = useUpdateEntityContextValue(updateCompany);

  const { state, onModalOpenChange } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: state.errorCode });
  }

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

  return (
    <UpdateCompanyContext.Provider value={contextValue}>
      {children}
    </UpdateCompanyContext.Provider>
  );
}

export function useUpdateCompany() {
  const context = useContext(UpdateCompanyContext);
  if (!context) {
    throw new Error(
      "useUpdateCompany must be used within a UpdateCompanyProvider",
    );
  }
  return context;
}
