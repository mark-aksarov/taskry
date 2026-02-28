"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
  useState,
} from "react";

interface DeleteProjectCategoriesContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  projectCategoryIds: number[];
  setProjectCategoryIds: (projectCategoryIds: number[]) => void;
}

const DeleteProjectCategoriesContext =
  createContext<DeleteProjectCategoriesContextType | null>(null);

interface DeleteProjectCategoriesProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoriesProvider({
  children,
}: DeleteProjectCategoriesProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [projectCategoryIds, setProjectCategoryIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
      projectCategoryIds,
      setProjectCategoryIds,
    }),
    [isPending, projectCategoryIds],
  );

  return (
    <DeleteProjectCategoriesContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoriesContext.Provider>
  );
}

export function useDeleteProjectCategories() {
  const context = useContext(DeleteProjectCategoriesContext);
  if (!context) {
    throw new Error(
      "useDeleteProjectCategories must be used within a DeleteProjectCategoriesProvider",
    );
  }
  return context;
}
