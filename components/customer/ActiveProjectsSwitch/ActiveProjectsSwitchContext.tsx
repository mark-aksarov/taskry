"use client";

import { useContext, createContext, useState, useMemo } from "react";

interface ActiveProjectsSwitch {
  isSelected: boolean;
  updateValue: (value: boolean) => void;
}

const ActiveProjectsSwitchContext = createContext<ActiveProjectsSwitch | null>(
  null,
);

interface ActiveProjectsSwitchProviderProps {
  initialValue: boolean;
  children: React.ReactNode;
}

export const ActiveProjectsSwitchProvider = ({
  initialValue,
  children,
}: ActiveProjectsSwitchProviderProps) => {
  const [isSelected, setIsSelected] = useState(initialValue);

  const contextValue = useMemo(
    () => ({
      isSelected,
      updateValue: setIsSelected,
    }),
    [isSelected],
  );

  return (
    <ActiveProjectsSwitchContext.Provider value={contextValue}>
      {children}
    </ActiveProjectsSwitchContext.Provider>
  );
};

export function useActiveProjectsSwitch() {
  const context = useContext(ActiveProjectsSwitchContext);
  if (context === null) {
    throw new Error(
      "useActiveProjectsSwitch must be used within a ActiveProjectsSwitchProvider",
    );
  }
  return context;
}
