"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateCustomerContext } from "../UpdateCustomerContext";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomer");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCustomer");
  useShowToastWhenModalClosedOnActionError(state, "updateCustomer");

  return (
    <UpdateCustomerContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerContext.Provider>
  );
}
