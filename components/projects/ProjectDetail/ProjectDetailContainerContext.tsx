"use client";

import { createContext, useContext } from "react";
import { ProjectDetailContainer as DefaultProjectDetailContainer } from "./ProjectDetailContainer";

type ProjectDetailContainerType = React.ComponentType<{ projectId: number }>;

const ProjectDetailContainerContext =
  createContext<ProjectDetailContainerType | null>(null);

interface ProjectDetailContainerProviderProps {
  ProjectDetailContainer?: ProjectDetailContainerType;
  children: React.ReactNode;
}

export function ProjectDetailContainerProvider({
  ProjectDetailContainer = DefaultProjectDetailContainer,
  children,
}: ProjectDetailContainerProviderProps) {
  return (
    <ProjectDetailContainerContext.Provider value={ProjectDetailContainer}>
      {children}
    </ProjectDetailContainerContext.Provider>
  );
}

export function useProjectDetailContainer(): ProjectDetailContainerType {
  const context = useContext(ProjectDetailContainerContext);
  if (!context) {
    throw new Error(
      "useProjectDetailContainer must be used within a ProjectDetailContainerProvider",
    );
  }
  return context;
}
