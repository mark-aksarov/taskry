"use client";

import { useContext, createContext, useState, useMemo } from "react";

interface OnlyMyTasksSwitch {
  isSelected: boolean;
  updateValue: (value: boolean) => void;
}

const OnlyMyTasksSwitchContext = createContext<OnlyMyTasksSwitch | null>(null);

interface OnlyMyTasksSwitchProviderProps {
  initialValue?: boolean;
  children: React.ReactNode;
}

export const OnlyMyTasksSwitchProvider = ({
  initialValue,
  children,
}: OnlyMyTasksSwitchProviderProps) => {
  const [isSelected, setIsSelected] = useState(!!initialValue);

  const contextValue = useMemo(
    () => ({
      isSelected,
      updateValue: setIsSelected,
    }),
    [isSelected],
  );

  return (
    <OnlyMyTasksSwitchContext.Provider value={contextValue}>
      {children}
    </OnlyMyTasksSwitchContext.Provider>
  );
};

export function useOnlyMyTasksSwitch() {
  const context = useContext(OnlyMyTasksSwitchContext);
  if (context === null) {
    throw new Error(
      "useOnlyMyTasksSwitch must be used within a OnlyMyTasksSwitchProvider",
    );
  }
  return context;
}
