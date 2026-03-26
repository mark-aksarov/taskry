"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const ProjectDetailModalContext = createContext<ModalContextType>(null);

interface ProjectDetailModalProviderProps {
  children: React.ReactNode;
}

export function ProjectDetailModalProvider({
  children,
}: ProjectDetailModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <ProjectDetailModalContext.Provider value={contextValue}>
      {children}
    </ProjectDetailModalContext.Provider>
  );
}

export function useProjectDetailModal() {
  const context = useContext(ProjectDetailModalContext);
  if (!context) {
    throw new Error(
      "useProjectDetailModal must be used within a ProjectDetailModalProvider",
    );
  }
  return context;
}
