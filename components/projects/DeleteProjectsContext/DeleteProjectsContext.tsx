"use client";

import {
  useMemo,
  useState,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteProjectsContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  projectIds: number[];
  setProjectIds: (projectIds: number[]) => void;
}

const DeleteProjectsContext = createContext<DeleteProjectsContextType | null>(
  null,
);

interface DeleteProjectsProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectsProvider({
  children,
}: DeleteProjectsProviderProps) {
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
    <DeleteProjectsContext.Provider value={contextValue}>
      {children}
    </DeleteProjectsContext.Provider>
  );
}

export function useDeleteProjects() {
  const context = useContext(DeleteProjectsContext);
  if (!context) {
    throw new Error(
      "useDeleteProjects must be used within a DeleteProjectsProvider",
    );
  }
  return context;
}
