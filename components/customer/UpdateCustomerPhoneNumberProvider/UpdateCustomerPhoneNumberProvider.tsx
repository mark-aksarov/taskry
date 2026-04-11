"use client";

import { useRouter } from "@/i18n/navigation";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { UpdateCustomerPhoneNumberContext } from "../UpdateCustomerPhoneNumberContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerPhoneNumberProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerPhoneNumberProvider({
  children,
}: UpdateCustomerPhoneNumberProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateCustomer, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomerPhoneNumber");
  useShowToastWhenModalClosedOnActionSuccess(
    state,
    "updateCustomerPhoneNumber",
  );
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerPhoneNumber");

  return (
    <UpdateCustomerPhoneNumberContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerPhoneNumberContext.Provider>
  );
}
