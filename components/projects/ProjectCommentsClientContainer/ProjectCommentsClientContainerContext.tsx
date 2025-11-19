"use client";

import { createContext } from "react";
import { ProjectCommentsClientContainer as DefaultProjectCommentsClientContainer } from "./ProjectCommentsClientContainer";

type ProjectCommentsClientContainerType = React.ComponentType<{
  projectId: number;
}>;

export const ProjectCommentsClientContainerContext =
  createContext<ProjectCommentsClientContainerType>(
    DefaultProjectCommentsClientContainer,
  );
