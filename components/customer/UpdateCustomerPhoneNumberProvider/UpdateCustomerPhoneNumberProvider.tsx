"use client";

import { useRouter } from "@/i18n/navigation";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { UpdateCustomerPhoneNumberContext } from "../UpdateCustomerPhoneNumberContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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

  useCloseModalOnActionSuccess(contextValue.state, "updateCustomerPhoneNumber");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerPhoneNumber");

  return (
    <UpdateCustomerPhoneNumberContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerPhoneNumberContext.Provider>
  );
}
