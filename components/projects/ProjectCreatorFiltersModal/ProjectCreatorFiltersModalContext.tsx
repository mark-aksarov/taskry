"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const ProjectCreatorFiltersModalContext = createContext<ModalContextType>(null);

interface ProjectCreatorFiltersModalProviderProps {
  children: React.ReactNode;
}

export function ProjectCreatorFiltersModalProvider({
  children,
}: ProjectCreatorFiltersModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <ProjectCreatorFiltersModalContext.Provider value={contextValue}>
      {children}
    </ProjectCreatorFiltersModalContext.Provider>
  );
}

export function useProjectCreatorFiltersModal() {
  const context = useContext(ProjectCreatorFiltersModalContext);
  if (!context) {
    throw new Error(
      "useProjectCreatorFiltersModal must be used within a ProjectCreatorFiltersModalProvider",
    );
  }
  return context;
}
