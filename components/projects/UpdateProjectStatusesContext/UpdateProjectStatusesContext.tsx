"use client";

import {
  useMemo,
  useState,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateProjectStatusesContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  projectIds: number[];
  setProjectIds: (projectIds: number[]) => void;
}

const UpdateProjectStatusesContext =
  createContext<UpdateProjectStatusesContextType | null>(null);

interface UpdateProjectStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusesProvider({
  children,
}: UpdateProjectStatusesProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [projectIds, setProjectIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
      projectIds,
      setProjectIds,
    }),
    [isPending, projectIds],
  );

  return (
    <UpdateProjectStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusesContext.Provider>
  );
}

export function useUpdateProjectStatuses() {
  const context = useContext(UpdateProjectStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatuses must be used within a UpdateProjectStatusesProvider",
    );
  }
  return context;
}
