"use client";

import { useCustomerFilters } from "../CustomerFiltersContext";
import { useContext, createContext, useState, useMemo } from "react";

interface OverdueProjectsSwitch {
  isSelected: boolean;
  updateValue: (value: boolean) => void;
}

const OverdueProjectsSwitchContext =
  createContext<OverdueProjectsSwitch | null>(null);

interface OverdueProjectsSwitchProviderProps {
  children: React.ReactNode;
}

export const OverdueProjectsSwitchProvider = ({
  children,
}: OverdueProjectsSwitchProviderProps) => {
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
    <OverdueProjectsSwitchContext.Provider value={contextValue}>
      {children}
    </OverdueProjectsSwitchContext.Provider>
  );
};

export function useOverdueProjectsSwitch() {
  const context = useContext(OverdueProjectsSwitchContext);
  if (context === null) {
    throw new Error(
      "useOverdueProjectsSwitch must be used within a OverdueProjectsSwitchProvider",
    );
  }
  return context;
}
