"use client";

import { createContext } from "react";

type EditProjectFormClientContainerType = React.ComponentType<{
  projectId: number;
}>;

export const EditProjectFormClientContainerContext =
  createContext<EditProjectFormClientContainerType | null>(null);
