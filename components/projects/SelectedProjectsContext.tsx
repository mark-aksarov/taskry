"use client";

import { ProjectStatus } from "@/generated/prisma/enums";
import React, { createContext, useContext } from "react";
import { useSelectedItemsState } from "@/lib/hooks/useSelectedItemsState";

export interface SelectedProject {
  id: number;
  status: ProjectStatus;
}

export interface SelectedProjectsContextType {
  add: (item: SelectedProject) => void;
  update: (id: number, updatedItem: Partial<SelectedProject>) => void;
  remove: (id: number) => void;
  get: (id: number) => SelectedProject | undefined;
  clear: () => void;
  items: SelectedProject[];
  ids: number[];
}

export const SelectedProjectsContext =
  createContext<SelectedProjectsContextType | null>(null);

export const SelectedProjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useSelectedItemsState<SelectedProject>();

  return (
    <SelectedProjectsContext.Provider value={value}>
      {children}
    </SelectedProjectsContext.Provider>
  );
};

export const useSelectedProjects = () => {
  const context = useContext(SelectedProjectsContext);

  if (!context) {
    throw new Error(
      "useSelectedProjects must be used within SelectedProjectsProvider",
    );
  }

  return context;
};
