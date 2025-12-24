"use client";

import { createContext } from "react";

type EditCustomerFormClientContainerType = React.ComponentType<{
  customerId: number;
}>;

export const EditCustomerFormClientContainerContext =
  createContext<EditCustomerFormClientContainerType | null>(null);

export function EditCustomerFormClientContainerProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: EditCustomerFormClientContainerType;
}) {
  return (
    <EditCustomerFormClientContainerContext.Provider value={value}>
      {children}
    </EditCustomerFormClientContainerContext.Provider>
  );
}
