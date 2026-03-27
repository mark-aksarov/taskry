"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const ProjectFiltersModalContext = createContext<ModalContextType>(null);

interface ProjectFiltersModalProviderProps {
  children: React.ReactNode;
}

export function ProjectFiltersModalProvider({
  children,
}: ProjectFiltersModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <ProjectFiltersModalContext.Provider value={contextValue}>
      {children}
    </ProjectFiltersModalContext.Provider>
  );
}

export function useProjectFiltersModal() {
  const context = useContext(ProjectFiltersModalContext);
  if (!context) {
    throw new Error(
      "useProjectFiltersModal must be used within a ProjectFiltersModalProvider",
    );
  }
  return context;
}
