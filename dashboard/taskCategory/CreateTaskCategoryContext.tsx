"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const CreateTaskCategoryContext =
  createContext<ActionContextType | null>(null);

interface CreateTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function CreateTaskCategoryProvider({
  children,
}: CreateTaskCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createTaskCategory, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createTaskCategory");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createTaskCategory",
  );

  return (
    <CreateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </CreateTaskCategoryContext.Provider>
  );
}

export function useCreateTaskCategory() {
  const context = useContext(CreateTaskCategoryContext);
  if (!context)
    throw new Error(
      "useCreateTaskCategory must be used within CreateTaskCategoryContext.Provider",
    );
  return context;
}
