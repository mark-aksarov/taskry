"use client";

import { useContext, createContext, useState, useMemo } from "react";
import { useCustomerFilters } from "@/components/customer/CustomerFiltersContext";

interface CompanyCheckboxGroup {
  value: string[];
  updateValue: (value: string[]) => void;
}

const CompanyCheckboxGroupContext = createContext<CompanyCheckboxGroup | null>(
  null,
);

interface CompanyCheckboxGroupProviderProps {
  children: React.ReactNode;
}

export const CompanyCheckboxGroupProvider = ({
  children,
}: CompanyCheckboxGroupProviderProps) => {
  const { companyIds } = useCustomerFilters();

  const [value, setValue] = useState(() => {
    if (!companyIds) {
      return [];
    }
    return companyIds?.map((id) => id.toString());
  });

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
