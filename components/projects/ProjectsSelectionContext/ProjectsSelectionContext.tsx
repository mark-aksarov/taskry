"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

interface ProjectsSelectionContextType {
  selectedIds: Record<number, boolean>;
  toggleSelection: (id: number) => void;
  clearSelection: () => void;
  selectedCount: number;
}

const ProjectsSelectionContext = createContext<
  ProjectsSelectionContextType | undefined
>(undefined);

export function ProjectsSelectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedIds, setSelectedIds] = useState<Record<number, boolean>>({});

  const toggleSelection = useCallback((id: number) => {
    setSelectedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds({});
  }, []);

  const selectedCount = useMemo(
    () => Object.values(selectedIds).filter(Boolean).length,
    [selectedIds],
  );

  const contextValue = useMemo(
    () => ({
      selectedIds,
      toggleSelection,
      clearSelection,
      selectedCount,
    }),
    [selectedIds, toggleSelection, clearSelection, selectedCount],
  );

  return (
    <ProjectsSelectionContext.Provider value={contextValue}>
      {children}
    </ProjectsSelectionContext.Provider>
  );
}

export const useProjectsSelection = () => {
  const context = useContext(ProjectsSelectionContext);
  if (!context) {
    throw new Error(
      "useProjectsSelection must be used within a ProjectsSelectionProvider",
    );
  }
  return context;
};
