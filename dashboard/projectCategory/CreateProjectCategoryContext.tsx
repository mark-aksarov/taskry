"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const CreateProjectCategoryContext = createContext<ActionContextType | null>(
  null,
);

interface CreateProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function CreateProjectCategoryProvider({
  children,
}: CreateProjectCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createProjectCategory, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createProjectCategory");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createProjectCategory",
  );

  return (
    <CreateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </CreateProjectCategoryContext.Provider>
  );
}

export function useCreateProjectCategory() {
  const context = useContext(CreateProjectCategoryContext);
  if (!context)
    throw new Error(
      "useCreateProjectCategory must be used within CreateProjectCategoryContext.Provider",
    );
  return context;
}
