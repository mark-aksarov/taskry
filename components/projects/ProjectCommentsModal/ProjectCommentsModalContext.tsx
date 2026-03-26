"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const ProjectCommentsModalContext = createContext<ModalContextType>(null);

interface ProjectCommentsModalProviderProps {
  children: React.ReactNode;
}

export function ProjectCommentsModalProvider({
  children,
}: ProjectCommentsModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <ProjectCommentsModalContext.Provider value={contextValue}>
      {children}
    </ProjectCommentsModalContext.Provider>
  );
}

export function useProjectCommentsModal() {
  const context = useContext(ProjectCommentsModalContext);
  if (!context) {
    throw new Error(
      "useProjectCommentsModal must be used within a ProjectCommentsModalProvider",
    );
  }
  return context;
}
