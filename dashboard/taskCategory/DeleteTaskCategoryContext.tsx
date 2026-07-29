"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { deleteTaskCategory } from "@/lib/actions/taskCategory/deleteTaskCategory";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const DeleteTaskCategoryContext =
  createContext<ActionContextType<number> | null>(null);

interface DeleteTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoryProvider({
  children,
}: DeleteTaskCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteTaskCategory, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteTaskCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoryContext.Provider>
  );
}

export function useDeleteTaskCategory() {
  const context = useContext(DeleteTaskCategoryContext);
  if (!context)
    throw new Error(
      "useDeleteTaskCategory must be used within DeleteTaskCategoryProvider",
    );
  return context;
}
