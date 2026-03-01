"use client";

import {
  useMemo,
  useState,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateTaskStatusesContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  taskIds: number[];
  setTaskIds: (taskIds: number[]) => void;
}

const UpdateTaskStatusesContext =
  createContext<UpdateTaskStatusesContextType | null>(null);

interface UpdateTaskStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusesProvider({
  children,
}: UpdateTaskStatusesProviderProps) {
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
    <UpdateTaskStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusesContext.Provider>
  );
}

export function useUpdateTaskStatuses() {
  const context = useContext(UpdateTaskStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatuses must be used within a UpdateTaskStatusesProvider",
    );
  }
  return context;
}
