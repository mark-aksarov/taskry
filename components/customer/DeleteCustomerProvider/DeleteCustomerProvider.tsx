"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteCustomerContext } from "../DeleteCustomerContext";
import { deleteCustomer } from "@/lib/actions/customer/deleteCustomer";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteCustomerProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomerProvider({
  children,
}: DeleteCustomerProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteCustomer, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteCustomerContext.Provider value={contextValue}>
      {children}
    </DeleteCustomerContext.Provider>
  );
}
