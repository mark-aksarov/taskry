"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { deleteProjectCategory } from "@/lib/actions/projectCategory/deleteProjectCategory";

export const DeleteProjectCategoryContext =
  createContext<ActionContextType<number> | null>(null);

interface DeleteProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoryProvider({
  children,
}: DeleteProjectCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteProjectCategory, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteProjectCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoryContext.Provider>
  );
}

export function useDeleteProjectCategory() {
  const context = useContext(DeleteProjectCategoryContext);
  if (!context)
    throw new Error(
      "useDeleteProjectCategory must be used within DeleteProjectCategoryContext.Provider",
    );
  return context;
}
