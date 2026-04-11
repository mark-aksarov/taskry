"use client";

import { useRouter } from "@/i18n/navigation";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { UpdateCustomerEmailContext } from "../UpdateCustomerEmailContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerEmailProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerEmailProvider({
  children,
}: UpdateCustomerEmailProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateCustomer, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomerEmail");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCustomerEmail");
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerEmail");

  return (
    <UpdateCustomerEmailContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerEmailContext.Provider>
  );
}
