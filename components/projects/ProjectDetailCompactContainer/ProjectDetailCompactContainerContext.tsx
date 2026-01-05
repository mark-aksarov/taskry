"use client";

import { createContext } from "react";
import { ProjectDetailCompactContainer as DefaultProjectDetailCompactContainer } from "./ProjectDetailCompactContainer";

type ProjectDetailCompactContainerType = React.ComponentType<{
  projectId: number;
}>;

export const ProjectDetailCompactContainerContext =
  createContext<ProjectDetailCompactContainerType>(
    DefaultProjectDetailCompactContainer,
  );
