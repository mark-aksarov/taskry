"use client";

import { createContext } from "react";
import { ProjectCommentsContainer as DefaultProjectCommentsContainer } from "./ProjectCommentsContainer";

type ProjectCommentsContainerType = React.ComponentType<{
  projectId: number;
}>;

export const ProjectCommentsContainerContext =
  createContext<ProjectCommentsContainerType>(DefaultProjectCommentsContainer);
