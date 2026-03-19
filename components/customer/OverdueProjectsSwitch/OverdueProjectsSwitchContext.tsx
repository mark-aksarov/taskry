"use client";

import { useContext, createContext, useState, useMemo } from "react";

interface OverdueProjectsSwitch {
  isSelected: boolean;
  updateValue: (value: boolean) => void;
}

const OverdueProjectsSwitchContext =
  createContext<OverdueProjectsSwitch | null>(null);

interface OverdueProjectsSwitchProviderProps {
  initialValue: boolean;
  children: React.ReactNode;
}

export const OverdueProjectsSwitchProvider = ({
  initialValue,
  children,
}: OverdueProjectsSwitchProviderProps) => {
  const [isSelected, setIsSelected] = useState(initialValue);

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
