"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const ProjectCategoryFiltersModalContext =
  createContext<ModalContextType>(null);

interface ProjectCategoryFiltersModalProviderProps {
  children: React.ReactNode;
}

export function ProjectCategoryFiltersModalProvider({
  children,
}: ProjectCategoryFiltersModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <ProjectCategoryFiltersModalContext.Provider value={contextValue}>
      {children}
    </ProjectCategoryFiltersModalContext.Provider>
  );
}

export function useProjectCategoryFiltersModal() {
  const context = useContext(ProjectCategoryFiltersModalContext);
  if (!context) {
    throw new Error(
      "useProjectCategoryFiltersModal must be used within a ProjectCategoryFiltersModalProvider",
    );
  }
  return context;
}
