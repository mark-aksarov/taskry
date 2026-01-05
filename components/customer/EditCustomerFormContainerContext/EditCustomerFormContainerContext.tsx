"use client";

import { createContext } from "react";

type EditCustomerFormContainerType = React.ComponentType<{
  customerId: number;
}>;

export const EditCustomerFormContainerContext =
  createContext<EditCustomerFormContainerType | null>(null);

export function EditCustomerFormContainerProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: EditCustomerFormContainerType;
}) {
  return (
    <EditCustomerFormContainerContext.Provider value={value}>
      {children}
    </EditCustomerFormContainerContext.Provider>
  );
}
