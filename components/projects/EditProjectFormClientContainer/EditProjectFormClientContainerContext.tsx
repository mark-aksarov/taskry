"use client";

import { createContext } from "react";
import { EditProjectFormClientContainer as DefaultEditProjectFormClientContainer } from "./EditProjectFormClientContainer";

type EditProjectFormClientContainerType = React.ComponentType<{
  projectId: number;
}>;

export const EditProjectFormClientContainerContext =
  createContext<EditProjectFormClientContainerType>(
    DefaultEditProjectFormClientContainer,
  );
