"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { updateProjectCategory } from "@/lib/actions/projectCategory/updateProjectCategory";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateProjectCategoryContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectCategoryProvider({
  children,
}: UpdateProjectCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProjectCategory, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProjectCategory");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProjectCategory");

  return (
    <UpdateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryContext.Provider>
  );
}

export function useUpdateProjectCategory() {
  const context = useContext(UpdateProjectCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCategory must be used within a UpdateProjectCategoryContext.Provider",
    );
  }
  return context;
}
