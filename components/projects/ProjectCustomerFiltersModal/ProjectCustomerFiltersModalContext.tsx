"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const ProjectCustomerFiltersModalContext =
  createContext<ModalContextType>(null);

interface ProjectCustomerFiltersModalProviderProps {
  children: React.ReactNode;
}

export function ProjectCustomerFiltersModalProvider({
  children,
}: ProjectCustomerFiltersModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <ProjectCustomerFiltersModalContext.Provider value={contextValue}>
      {children}
    </ProjectCustomerFiltersModalContext.Provider>
  );
}

export function useProjectCustomerFiltersModal() {
  const context = useContext(ProjectCustomerFiltersModalContext);
  if (!context) {
    throw new Error(
      "useProjectCustomerFiltersModal must be used within a ProjectCustomerFiltersModalProvider",
    );
  }
  return context;
}
