"use client";

import { createContext } from "react";
import { ProjectDetailCompactClientContainer as DefaultProjectDetailCompactClientContainer } from "./ProjectDetailCompactClientContainer";

type ProjectDetailCompactClientContainerType = React.ComponentType<{
  projectId: number;
}>;

export const ProjectDetailCompactClientContainerContext =
  createContext<ProjectDetailCompactClientContainerType>(
    DefaultProjectDetailCompactClientContainer,
  );
