"use client";

import { useContext, createContext, useState, useMemo } from "react";

interface ProjectCheckboxGroup {
  value: string[];
  updateValue: (value: string[]) => void;
}

const ProjectCheckboxGroupContext = createContext<ProjectCheckboxGroup | null>(
  null,
);

interface ProjectCheckboxGroupProviderProps {
  initialProjectIds?: number[];
  children: React.ReactNode;
}

export const ProjectCheckboxGroupProvider = ({
  initialProjectIds,
  children,
}: ProjectCheckboxGroupProviderProps) => {
  const [value, setValue] = useState(
    initialProjectIds ? initialProjectIds.map((id) => id.toString()) : [],
  );

  const contextValue = useMemo(
    () => ({
      value,
      updateValue: setValue,
    }),
    [value],
  );

  return (
    <ProjectCheckboxGroupContext.Provider value={contextValue}>
      {children}
    </ProjectCheckboxGroupContext.Provider>
  );
};

export function useProjectCheckboxGroup() {
  const context = useContext(ProjectCheckboxGroupContext);
  if (context === null) {
    throw new Error(
      "useProjectCheckboxGroup must be used within a ProjectCheckboxGroupProvider",
    );
  }
  return context;
}
