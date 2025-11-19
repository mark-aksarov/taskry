"use client";

import { createContext } from "react";
import { UpdateSubtasksFormContainer as DefaultUpdateSubtasksFormContainer } from "./UpdateSubtasksFormContainer";

type UpdateSubtasksFormContainerType = React.ComponentType<{ taskId: number }>;

export const UpdateSubtasksFormContainerContext =
  createContext<UpdateSubtasksFormContainerType>(
    DefaultUpdateSubtasksFormContainer,
  );
