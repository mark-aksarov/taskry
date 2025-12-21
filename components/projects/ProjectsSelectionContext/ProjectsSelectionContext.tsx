"use client";

import { createContext, useContext } from "react";
import { useSelection, UseSelectionType } from "@/lib/hooks/useSelection";

const ProjectsSelection = createContext<UseSelectionType | null>(null);

export function ProjectsSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const selection = useSelection();
  return (
    <ProjectsSelection.Provider value={selection}>
      {children}
    </ProjectsSelection.Provider>
  );
}

export const useProjectsSelection = () => {
  const context = useContext(ProjectsSelection);
  if (!context)
    throw new Error(
      "useProjectsSelection must be used within ProjectsSelectionProvider",
    );
  return context;
};
