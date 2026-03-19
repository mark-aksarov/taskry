"use client";

import { useContext, createContext, useState, useMemo } from "react";

interface CompanyCheckboxGroup {
  value: string[];
  updateValue: (value: string[]) => void;
}

const CompanyCheckboxGroupContext = createContext<CompanyCheckboxGroup | null>(
  null,
);

interface CompanyCheckboxGroupProviderProps {
  initialValue: string[];
  children: React.ReactNode;
}

export const CompanyCheckboxGroupProvider = ({
  initialValue,
  children,
}: CompanyCheckboxGroupProviderProps) => {
  const [value, setValue] = useState(initialValue);

  const contextValue = useMemo(
    () => ({
      value,
      updateValue: setValue,
    }),
    [value],
  );

  return (
    <CompanyCheckboxGroupContext.Provider value={contextValue}>
      {children}
    </CompanyCheckboxGroupContext.Provider>
  );
};

export function useCompanyCheckboxGroup() {
  const context = useContext(CompanyCheckboxGroupContext);
  if (context === null) {
    throw new Error(
      "useCompanyCheckboxGroup must be used within a CompanyCheckboxGroupProvider",
    );
  }
  return context;
}
