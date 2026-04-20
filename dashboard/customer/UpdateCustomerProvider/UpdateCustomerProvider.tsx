"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateCustomerContext } from "../UpdateCustomerContext";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateCustomerProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerProvider({
  children,
}: UpdateCustomerProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateCustomer, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateCustomer");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateCustomer");

  return (
    <UpdateCustomerContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerContext.Provider>
  );
}
