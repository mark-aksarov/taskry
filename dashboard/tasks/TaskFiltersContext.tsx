"use client";

import { TaskFilters } from "@/lib/types";
import { useContext, createContext } from "react";

/**
 * Single source of truth for task filters.
 * The filters provided here have been validated and normalized from the URL search params.
 */

const TaskFiltersContext = createContext<TaskFilters | null>(null);

interface TaskFiltersProviderProps {
  filters: TaskFilters;
  children: React.ReactNode;
}

export const TaskFiltersProvider = ({
  filters,
  children,
}: TaskFiltersProviderProps) => {
  return (
    <TaskFiltersContext.Provider value={filters}>
      {children}
    </TaskFiltersContext.Provider>
  );
};

export function useTaskFilters() {
  const context = useContext(TaskFiltersContext);
  if (context === null) {
    throw new Error("useTaskFilters must be used within a TaskFiltersProvider");
  }
  return context;
}
