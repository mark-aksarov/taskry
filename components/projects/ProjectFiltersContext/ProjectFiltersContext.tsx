"use client";

import { ProjectFilters } from "@/lib/types";
import { useContext, createContext } from "react";

/**
 * Single source of truth for project filters.
 * The filters provided here have been validated and normalized from the URL search params.
 */

const ProjectFiltersContext = createContext<ProjectFilters | null>(null);

interface ProjectFiltersProviderProps {
  filters: ProjectFilters;
  children: React.ReactNode;
}

export const ProjectFiltersProvider = ({
  filters,
  children,
}: ProjectFiltersProviderProps) => {
  return (
    <ProjectFiltersContext.Provider value={filters}>
      {children}
    </ProjectFiltersContext.Provider>
  );
};

export function useProjectFilters() {
  const context = useContext(ProjectFiltersContext);
  if (context === null) {
    throw new Error(
      "useProjectFilters must be used within a ProjectFiltersProvider",
    );
  }
  return context;
}
