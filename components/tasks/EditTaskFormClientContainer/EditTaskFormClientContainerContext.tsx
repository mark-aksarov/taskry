"use client";

import { createContext } from "react";
import { EditTaskFormClientContainer as DefaultEditTaskFormClientContainer } from "./EditTaskFormClientContainer";

type EditTaskFormClientContainerType = React.ComponentType;

export const EditTaskFormClientContainerContext =
  createContext<EditTaskFormClientContainerType>(
    DefaultEditTaskFormClientContainer,
  );
