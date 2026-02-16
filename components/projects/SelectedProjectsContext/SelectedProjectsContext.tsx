"use client";

import { createContext, useContext } from "react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useSelectedItemsState } from "@/lib/hooks/useSelectedItemsState";

interface SelectedProject {
  id: number;
  status: ProjectStatus;
}

const SelectedProjectsContext = createContext<ReturnType<
  typeof useSelectedItemsState<SelectedProject>
> | null>(null);

interface SelectedProjectsProviderProps {
  pageItems: SelectedProject[];
  children: React.ReactNode;
}

export function SelectedProjectsProvider({
  pageItems,
  children,
}: SelectedProjectsProviderProps) {
  const value = useSelectedItemsState<SelectedProject>(pageItems);

  return (
    <SelectedProjectsContext.Provider value={value}>
      {children}
    </SelectedProjectsContext.Provider>
  );
}

export function useSelectedProjects() {
  const context = useContext(SelectedProjectsContext);
  if (!context) {
    throw new Error("useSelectedProjects must be used inside provider");
  }
  return context;
}
