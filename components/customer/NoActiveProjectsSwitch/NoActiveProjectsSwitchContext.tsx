"use client";

import { useCustomerFilters } from "../CustomerFiltersContext";
import { useContext, createContext, useState, useMemo } from "react";

interface NoActiveProjectsSwitch {
  isSelected: boolean;
  updateValue: (value: boolean) => void;
}

const NoActiveProjectsSwitchContext =
  createContext<NoActiveProjectsSwitch | null>(null);

interface NoActiveProjectsSwitchProviderProps {
  children: React.ReactNode;
}

export const NoActiveProjectsSwitchProvider = ({
  children,
}: NoActiveProjectsSwitchProviderProps) => {
  const { hasNoActiveProjects } = useCustomerFilters();

  const [isSelected, setIsSelected] = useState(!!hasNoActiveProjects);

  const contextValue = useMemo(
    () => ({
      isSelected,
      updateValue: setIsSelected,
    }),
    [isSelected],
  );

  return (
    <NoActiveProjectsSwitchContext.Provider value={contextValue}>
      {children}
    </NoActiveProjectsSwitchContext.Provider>
  );
};

export function useNoActiveProjectsSwitch() {
  const context = useContext(NoActiveProjectsSwitchContext);
  if (context === null) {
    throw new Error(
      "useNoActiveProjectsSwitch must be used within a NoActiveProjectsSwitchProvider",
    );
  }
  return context;
}
