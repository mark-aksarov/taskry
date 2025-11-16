"use client";

import { createContext, useContext } from "react";
import { ProjectCommentsContainer as DefaultProjectCommentsContainer } from "./ProjectCommentsContainer";

type ProjectCommentsContainerType = React.ComponentType<{ projectId: number }>;

const ProjectCommentsContainerContext =
  createContext<ProjectCommentsContainerType | null>(null);

interface ProjectCommentsContainerProviderProps {
  ProjectCommentsContainer?: ProjectCommentsContainerType;
  children: React.ReactNode;
}

export function ProjectCommentsContainerProvider({
  ProjectCommentsContainer = DefaultProjectCommentsContainer,
  children,
}: ProjectCommentsContainerProviderProps) {
  return (
    <ProjectCommentsContainerContext.Provider value={ProjectCommentsContainer}>
      {children}
    </ProjectCommentsContainerContext.Provider>
  );
}

export function useProjectCommentsContainer(): ProjectCommentsContainerType {
  const context = useContext(ProjectCommentsContainerContext);
  if (!context) {
    throw new Error(
      "useProjectCommentsContainer must be used within a ProjectCommentsContainerProvider",
    );
  }
  return context;
}
