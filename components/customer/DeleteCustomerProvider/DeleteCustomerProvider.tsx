"use client";

import { DeleteCustomerContext } from "../DeleteCustomerContext";
import { deleteCustomer } from "@/lib/actions/customer/deleteCustomer";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteCustomerProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomerProvider({
  children,
}: DeleteCustomerProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(deleteCustomer);
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteCustomerContext.Provider value={contextValue}>
      {children}
    </DeleteCustomerContext.Provider>
  );
}
