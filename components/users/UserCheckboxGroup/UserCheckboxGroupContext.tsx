"use client";

import { useContext, createContext, useState, useMemo } from "react";

interface UserCheckboxGroup {
  value: string[];
  updateValue: (value: string[]) => void;
}

const UserCheckboxGroupContext = createContext<UserCheckboxGroup | null>(null);

interface UserCheckboxGroupProviderProps {
  initialAssigneeIds?: string[];
  children: React.ReactNode;
}

export const UserCheckboxGroupProvider = ({
  initialAssigneeIds,
  children,
}: UserCheckboxGroupProviderProps) => {
  const [value, setValue] = useState(
    initialAssigneeIds ? initialAssigneeIds.map((id) => id.toString()) : [],
  );

  const contextValue = useMemo(
    () => ({
      value,
      updateValue: setValue,
    }),
    [value],
  );

  return (
    <UserCheckboxGroupContext.Provider value={contextValue}>
      {children}
    </UserCheckboxGroupContext.Provider>
  );
};

export function useUserCheckboxGroup() {
  const context = useContext(UserCheckboxGroupContext);
  if (context === null) {
    throw new Error(
      "useUserCheckboxGroup must be used within a UserCheckboxGroupProvider",
    );
  }
  return context;
}
