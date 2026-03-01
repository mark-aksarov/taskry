"use client";

import {
  useMemo,
  useState,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteTasksContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  taskIds: number[];
  setTaskIds: (taskIds: number[]) => void;
}

const DeleteTasksContext = createContext<DeleteTasksContextType | null>(null);

interface DeleteTasksProviderProps {
  children: React.ReactNode;
}

export function DeleteTasksProvider({ children }: DeleteTasksProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [taskIds, setTaskIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
      taskIds,
      setTaskIds,
    }),
    [isPending, taskIds],
  );

  return (
    <DeleteTasksContext.Provider value={contextValue}>
      {children}
    </DeleteTasksContext.Provider>
  );
}

export function useDeleteTasks() {
  const context = useContext(DeleteTasksContext);
  if (!context) {
    throw new Error("useDeleteTasks must be used within a DeleteTasksProvider");
  }
  return context;
}
