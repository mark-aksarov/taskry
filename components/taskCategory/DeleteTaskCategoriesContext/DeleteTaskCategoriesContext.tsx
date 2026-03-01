"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
  useState,
} from "react";

interface DeleteTaskCategoriesContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  taskCategoryIds: number[];
  setTaskCategoryIds: (taskCategoryIds: number[]) => void;
}

const DeleteTaskCategoriesContext =
  createContext<DeleteTaskCategoriesContextType | null>(null);

interface DeleteTaskCategoriesProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoriesProvider({
  children,
}: DeleteTaskCategoriesProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [taskCategoryIds, setTaskCategoryIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
      taskCategoryIds,
      setTaskCategoryIds,
    }),
    [isPending, taskCategoryIds],
  );

  return (
    <DeleteTaskCategoriesContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoriesContext.Provider>
  );
}

export function useDeleteTaskCategories() {
  const context = useContext(DeleteTaskCategoriesContext);
  if (!context) {
    throw new Error(
      "useDeleteTaskCategories must be used within a DeleteTaskCategoriesProvider",
    );
  }
  return context;
}
