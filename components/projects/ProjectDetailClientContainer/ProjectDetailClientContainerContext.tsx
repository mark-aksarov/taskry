"use client";

import { createContext } from "react";
import { ProjectDetailClientContainer as DefaultProjectDetailClientContainer } from "./ProjectDetailClientContainer";

type ProjectDetailClientContainerType = React.ComponentType<{
  projectId: number;
}>;

export const ProjectDetailClientContainerContext =
  createContext<ProjectDetailClientContainerType>(
    DefaultProjectDetailClientContainer,
  );
